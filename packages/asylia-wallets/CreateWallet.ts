import {
  EMPTY_SIGN_DEVICE_METHOD,
  SIGN_DEVICES_LIST,
  type WalletExtendedPublicKey,
} from '@shared/types/SignKeys';
import type { Quorum, WalletConfigType } from '@shared/types/WalletStructure';
import { generateSignKey, MULTISIG_ACCOUNT_PATH } from '@packages/asylia-wallets/p2wsh';

export const USER_KEYS_LIST = [
  SIGN_DEVICES_LIST.TREZOR,
  SIGN_DEVICES_LIST.LEDGER,
  SIGN_DEVICES_LIST.MOBILE_APP,
];

// --- TYPE DEFINÍCIE ---

export type UseWalletKeysManagerFuncParamsType = {
  walletKeysRaw: WalletExtendedPublicKey[];
  quorum: Quorum;
};

export type StateUpdateFuncType = (payload: UseWalletKeysManagerFuncReturnType) => void;

export type UpdateKeyOnIndexFuncParamsType = {
  index: number;
  key: WalletExtendedPublicKey;
};

export type UpdateKeyOnIndexFuncType = (params: UpdateKeyOnIndexFuncParamsType) => boolean;

export type GenerateAndSetWalletBackupKeysFuncType = () => Promise<boolean>;

export type GetWalletKeysFuncType = () => WalletExtendedPublicKey[];

export type UseWalletKeysManagerFuncReturnType = {
  readonly allWalletKeysAreFullySetUp: boolean;
  readonly allUsersKeysAreFullySetUp: boolean;
  readonly hasEmptyAnyBackupKey: boolean;
  readonly walletKeys: WalletExtendedPublicKey[];
  updateKeyOnIndex: UpdateKeyOnIndexFuncType;
  generateAndSetWalletBackupKeys: GenerateAndSetWalletBackupKeysFuncType;
  getWalletKeys: GetWalletKeysFuncType;
};

export type UseWalletKeysManagerFuncType = (
  params: UseWalletKeysManagerFuncParamsType,
  onStateUpdate?: StateUpdateFuncType,
) => UseWalletKeysManagerFuncReturnType;

// --- UTILITY FUNKCIE ---

export const extendedPublicKeyIsSetUp = (key: WalletExtendedPublicKey): boolean => {
  const methodOk = key?.method !== EMPTY_SIGN_DEVICE_METHOD;
  const xpubOk = !!(key?.xpub && key?.xpub.length > 0);
  const xfpOk = !!(key?.xfp && key?.xfp.length > 0);
  return methodOk && xpubOk && xfpOk;
};

const isEmptyBackupKey = (key: WalletExtendedPublicKey): boolean => {
  return key.method === SIGN_DEVICES_LIST.ASYLIA && !extendedPublicKeyIsSetUp(key);
};

// --- CORE WALLET KEYS MANAGER ---

export const useWalletKeysManager: UseWalletKeysManagerFuncType = (params, onStateUpdate) => {
  const { walletKeysRaw, quorum } = params;
  let walletKeys: WalletExtendedPublicKey[] = [...walletKeysRaw];

  // Čisté util funkcie pre výpočet stavu
  const allWalletKeysAreFullySetUpCalc = (keys: WalletExtendedPublicKey[] | undefined): boolean => {
    if (!keys || keys.length === 0) return false;
    return keys.every(extendedPublicKeyIsSetUp);
  };

  const allUsersKeysAreFullySetUpCalc = (
    keys: WalletExtendedPublicKey[],
    requiredSigners: number,
  ): boolean => {
    if (!keys.length || requiredSigners === 0) return false;
    const userWalletKeys = keys.filter(
      (key) => extendedPublicKeyIsSetUp(key) && USER_KEYS_LIST.includes(key.method as any),
    );
    return userWalletKeys.length === requiredSigners;
  };

  const hasEmptyAnyBackupKeyCalc = (keys: WalletExtendedPublicKey[]): boolean => {
    if (allWalletKeysAreFullySetUpCalc(keys)) return false;
    return keys.some(isEmptyBackupKey);
  };

  // Getter snapshot funkcia
  const getSnapshot = (): UseWalletKeysManagerFuncReturnType => ({
    get allWalletKeysAreFullySetUp() {
      return allWalletKeysAreFullySetUpCalc(walletKeys);
    },
    get allUsersKeysAreFullySetUp() {
      return allUsersKeysAreFullySetUpCalc(walletKeys, quorum.requiredSigners);
    },
    get hasEmptyAnyBackupKey() {
      return hasEmptyAnyBackupKeyCalc(walletKeys);
    },
    get walletKeys() {
      return [...walletKeys];
    },
    updateKeyOnIndex,
    generateAndSetWalletBackupKeys,
    getWalletKeys,
  });

  // --- METÓDY ---

  // Pozor: funkcia musí byť hoisted kvôli volaniu v callbacku!
  function updateKeyOnIndex(params: UpdateKeyOnIndexFuncParamsType): boolean {
    const { index, key } = params;
    if (index < 0 || index >= walletKeys.length) {
      console.error('updateKeyOnIndex: Invalid index', index);
      return false;
    }
    walletKeys[index] = key;
    handleStateUpdate();
    return true;
  }

  async function generateAndSetWalletBackupKeys(): Promise<boolean> {
    if (allWalletKeysAreFullySetUpCalc(walletKeys)) {
      console.warn('generateAndSetWalletBackupKeys: All wallet keys are already fully set up.');
      return true;
    }
    for (let i = 0; i < walletKeys.length; i++) {
      const key = walletKeys[i];
      if (key && isEmptyBackupKey(key)) {
        const generatedSignKey = await generateSignKey();
        const newKey: WalletExtendedPublicKey = {
          name: key.name || `Asylia Sign Key ${i + 1}`,
          bip32Path: key.bip32Path || MULTISIG_ACCOUNT_PATH,
          xfp: generatedSignKey.xfp,
          method: SIGN_DEVICES_LIST.ASYLIA,
          xpub: generatedSignKey.xpub,
          xpriv: generatedSignKey.xpriv,
        };
        const keyUpdated = updateKeyOnIndex({ index: i, key: newKey });
        if (!keyUpdated) {
          console.error('generateAndSetWalletBackupKeys: Failed to update key on index', i);
          return false;
        }
      }
    }
    return true;
  }

  function getWalletKeys(): WalletExtendedPublicKey[] {
    return [...walletKeys];
  }

  function handleStateUpdate(): void {
    if (onStateUpdate) {
      onStateUpdate(getSnapshot());
    }
  }

  return getSnapshot();
};

// --- HLAVNÁ WALLET CLOSURE ---

export type CreateWalletFuncParamsType = WalletConfigType;
export type CreateWalletFuncReturnType = {
  id: string;
  name: string;
  keyManager: UseWalletKeysManagerFuncReturnType;
};

export function createWallet(
  walletConfig: CreateWalletFuncParamsType,
  onKeysManagerUpdate?: StateUpdateFuncType,
): CreateWalletFuncReturnType {
  const { id, quorum, extendedPublicKeys, name } = walletConfig;

  const keyManager = useWalletKeysManager(
    {
      walletKeysRaw: extendedPublicKeys,
      quorum,
    },
    onKeysManagerUpdate,
  );

  return {
    id,
    name,
    keyManager,
  };
}
