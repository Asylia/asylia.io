import {
  EMPTY_SIGN_DEVICE_METHOD,
  SIGN_DEVICES_LIST,
  type WalletExtendedPublicKey,
} from '@shared/types/SignKeys';
import type { Quorum, WalletConfigType } from '@shared/types/WalletStructure';
import { generateSignKey, MULTISIG_ACCOUNT_PATH } from '@packages/asylia-wallets/p2wsh';

// --- CONSTANTS ---
const USER_KEYS_LIST = [
  SIGN_DEVICES_LIST.TREZOR,
  SIGN_DEVICES_LIST.LEDGER,
  SIGN_DEVICES_LIST.MOBILE_APP,
] as const;

// --- INTERFACES ---
interface StateObserver<T> {
  update(state: T): void;
}

interface WalletKeysState {
  readonly allWalletKeysAreFullySetUp: boolean;
  readonly allUsersKeysAreFullySetUp: boolean;
  readonly hasEmptyAnyBackupKey: boolean;
  readonly walletKeys: ReadonlyArray<WalletExtendedPublicKey>;
}

interface WalletState {
  readonly id: string;
  readonly name: string;
  readonly config: WalletConfigType;
  readonly keysState: WalletKeysState;
}

// --- UTILITY CLASS ---
class WalletKeyValidator {
  static isFullySetUp(key: WalletExtendedPublicKey): boolean {
    return (
      key?.method !== EMPTY_SIGN_DEVICE_METHOD &&
      !!key?.xpub?.length &&
      !!key?.xfp?.length
    );
  }

  static isEmptyBackupKey(key: WalletExtendedPublicKey): boolean {
    return key.method === SIGN_DEVICES_LIST.ASYLIA && !this.isFullySetUp(key);
  }

  static isUserKey(key: WalletExtendedPublicKey): boolean {
    return USER_KEYS_LIST.includes(key.method as any);
  }
}

// --- OBSERVABLE BASE CLASS ---
abstract class Observable<T> {
  private observers: Set<StateObserver<T>> = new Set();

  addObserver(observer: StateObserver<T>): void {
    this.observers.add(observer);
  }

  removeObserver(observer: StateObserver<T>): void {
    this.observers.delete(observer);
  }

  protected notifyObservers(state: T): void {
    this.observers.forEach(observer => observer.update(state));
  }
}

// --- WALLET KEYS MANAGER ---
class WalletKeysManager extends Observable<WalletKeysState> {
  private keys: WalletExtendedPublicKey[];
  private readonly requiredSigners: number;
  private autoGenerateBackupKeys: boolean = true;

  constructor(
    initialKeys: WalletExtendedPublicKey[],
    quorum: Quorum,
    options?: { autoGenerateBackupKeys?: boolean }
  ) {
    super();
    this.keys = [...initialKeys];
    this.requiredSigners = quorum.requiredSigners;
    this.autoGenerateBackupKeys = options?.autoGenerateBackupKeys ?? true;
    this.notifyState();
  }

  // --- COMPUTED PROPERTIES ---
  get allKeysFullySetUp(): boolean {
    return this.keys.length > 0 &&
      this.keys.every(key => WalletKeyValidator.isFullySetUp(key));
  }

  get allUsersKeysFullySetUp(): boolean {
    if (!this.keys.length || this.requiredSigners === 0) return false;

    const userKeys = this.keys.filter(
      key => WalletKeyValidator.isFullySetUp(key) && WalletKeyValidator.isUserKey(key)
    );

    return userKeys.length === this.requiredSigners;
  }

  get hasEmptyBackupKeys(): boolean {
    return !this.allKeysFullySetUp &&
      this.keys.some(key => WalletKeyValidator.isEmptyBackupKey(key));
  }

  get walletKeys(): ReadonlyArray<WalletExtendedPublicKey> {
    return [...this.keys];
  }

  // --- PUBLIC METHODS ---
  async updateKey(index: number, key: WalletExtendedPublicKey): Promise<boolean> {
    if (index < 0 || index >= this.keys.length) {
      console.error(`Invalid key index: ${index}`);
      return false;
    }

    this.keys[index] = key;
    this.notifyState();

    // Auto-generate backup keys if enabled and conditions are met
    if (this.autoGenerateBackupKeys && this.shouldAutoGenerateBackupKeys()) {
      console.log('All user keys are set up, auto-generating backup keys...');
      const backupGenerated = await this.generateBackupKeys();
      if (!backupGenerated) {
        console.error('Failed to auto-generate backup keys');
      }
    }

    return true;
  }

  async generateBackupKeys(): Promise<boolean> {
    if (this.allKeysFullySetUp) {
      console.warn('All wallet keys are already fully set up');
      return true;
    }

    if (!this.allUsersKeysFullySetUp) {
      console.warn('Cannot generate backup keys: user keys are not fully set up');
      return false;
    }

    try {
      const updates = await Promise.all(
        this.keys.map(async (key, index) => {
          if (!WalletKeyValidator.isEmptyBackupKey(key)) {
            return null;
          }

          const generatedKey = await generateSignKey();
          return {
            index,
            key: this.createBackupKey(key, generatedKey, index)
          };
        })
      );

      // Apply all updates
      const validUpdates = updates.filter(Boolean) as Array<{index: number; key: WalletExtendedPublicKey}>;
      validUpdates.forEach(({ index, key }) => {
        this.keys[index] = key;
      });

      if (validUpdates.length > 0) {
        this.notifyState();
      }

      return true;
    } catch (error) {
      console.error('Failed to generate backup keys:', error);
      return false;
    }
  }

  // --- CONFIGURATION METHODS ---
  setAutoGenerateBackupKeys(enabled: boolean): void {
    this.autoGenerateBackupKeys = enabled;
  }

  // --- PRIVATE METHODS ---
  private shouldAutoGenerateBackupKeys(): boolean {
    return this.allUsersKeysFullySetUp && !this.allKeysFullySetUp && this.hasEmptyBackupKeys;
  }

  private createBackupKey(
    originalKey: WalletExtendedPublicKey,
    generatedKey: any,
    index: number
  ): WalletExtendedPublicKey {
    return {
      name: originalKey.name || `Asylia Sign Key ${index + 1}`,
      bip32Path: originalKey.bip32Path || MULTISIG_ACCOUNT_PATH,
      xfp: generatedKey.xfp,
      method: SIGN_DEVICES_LIST.ASYLIA,
      xpub: generatedKey.xpub,
      xpriv: generatedKey.xpriv,
    };
  }

  private notifyState(): void {
    const state: WalletKeysState = {
      allWalletKeysAreFullySetUp: this.allKeysFullySetUp,
      allUsersKeysAreFullySetUp: this.allUsersKeysFullySetUp,
      hasEmptyAnyBackupKey: this.hasEmptyBackupKeys,
      walletKeys: this.walletKeys,
    };
    this.notifyObservers(state);
  }

  // --- STATE MANAGEMENT ---
  getState(): WalletKeysState {
    return {
      allWalletKeysAreFullySetUp: this.allKeysFullySetUp,
      allUsersKeysAreFullySetUp: this.allUsersKeysFullySetUp,
      hasEmptyAnyBackupKey: this.hasEmptyBackupKeys,
      walletKeys: this.walletKeys,
    };
  }

  clear(): void {
    this.keys = [];
    this.notifyState();
  }
}

// --- WALLET CLASS ---
class Wallet extends Observable<WalletState> {
  private readonly id: string;
  private name: string;
  private config: WalletConfigType;
  private keysManager: WalletKeysManager;

  constructor(config: WalletConfigType) {
    super();
    this.id = config.id;
    this.name = config.name;
    this.config = { ...config };

    this.keysManager = new WalletKeysManager(
      config.extendedPublicKeys,
      config.quorum,
      { autoGenerateBackupKeys: true }
    );

    // Subscribe to keys manager changes
    this.keysManager.addObserver({
      update: () => this.notifyState()
    });

    this.notifyState();
  }

  // --- GETTERS ---
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getConfig(): WalletConfigType {
    return {
      ...this.config,
      extendedPublicKeys: this.keysManager.walletKeys as WalletExtendedPublicKey[],
    };
  }

  getKeysManager(): WalletKeysManager {
    return this.keysManager;
  }

  getState(): WalletState {
    return {
      id: this.id,
      name: this.name,
      config: this.getConfig(),
      keysState: this.keysManager.getState(),
    };
  }

  // --- PUBLIC METHODS ---
  updateName(name: string): void {
    this.name = name;
    this.config.name = name;
    this.notifyState();
  }

  clear(): void {
    this.keysManager.clear();
    this.config.extendedPublicKeys = [];
    this.notifyState();
  }

  private notifyState(): void {
    this.notifyObservers(this.getState());
  }
}

// --- FACTORY FUNCTION FOR COMPATIBILITY ---
export function createWallet(
  walletConfig: WalletConfigType,
  stateUpdate?: {
    onWalletConfigUpdate?: (state: WalletState) => void;
    onKeysManagerUpdate?: (state: WalletKeysState) => void;
  }
) {
  const wallet = new Wallet(walletConfig);

  // Set up observers if provided
  if (stateUpdate?.onWalletConfigUpdate) {
    wallet.addObserver({
      update: (state) => stateUpdate.onWalletConfigUpdate!(state)
    });
  }

  if (stateUpdate?.onKeysManagerUpdate) {
    wallet.getKeysManager().addObserver({
      update: (state) => stateUpdate.onKeysManagerUpdate!(state)
    });
  }

  // Return compatibility object
  return {
    id: wallet.getId(),
    name: wallet.getName(),
    keyManager: {
      get allWalletKeysAreFullySetUp() {
        return wallet.getKeysManager().allKeysFullySetUp;
      },
      get allUsersKeysAreFullySetUp() {
        return wallet.getKeysManager().allUsersKeysFullySetUp;
      },
      get hasEmptyAnyBackupKey() {
        return wallet.getKeysManager().hasEmptyBackupKeys;
      },
      get walletKeys() {
        return wallet.getKeysManager().walletKeys;
      },
      updateKeyOnIndex: (params: { index: number; key: WalletExtendedPublicKey }) =>
        wallet.getKeysManager().updateKey(params.index, params.key),
      generateAndSetWalletBackupKeys: () =>
        wallet.getKeysManager().generateBackupKeys(),
      getWalletKeys: () =>
        [...wallet.getKeysManager().walletKeys],
    },
    walletConfig: wallet.getConfig(),
    getWalletConfig: () => wallet.getConfig(),
    clearState: () => wallet.clear(),
  };
}

// --- EXPORTS ---
export {
  Wallet,
  WalletKeysManager,
  WalletKeyValidator,
  type WalletState,
  type WalletKeysState,
  type StateObserver
};

// Export utility functions for backward compatibility
export const extendedPublicKeyIsSetUp = WalletKeyValidator.isFullySetUp;
export const isEmptyBackupKey = WalletKeyValidator.isEmptyBackupKey;
export const isUserKey = WalletKeyValidator.isUserKey;
