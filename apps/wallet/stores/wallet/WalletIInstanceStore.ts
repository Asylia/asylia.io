import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
import type { WalletConfigType } from '@shared/types/WalletStructure';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';
import {
  Wallet,
  type WalletState,
  type WalletKeysState,
  extendedPublicKeyIsSetUp,
} from '@packages/asylia-wallets/CreateWallet';
import deepClone from 'deep-clone';

// --- TYPES ---
interface WalletStoreState {
  id: string;
  name: string;
  walletConfig: WalletConfigType | undefined;
}

interface WalletKeysStoreState {
  allWalletKeysAreFullySetUp: boolean;
  allUsersKeysAreFullySetUp: boolean;
  hasEmptyAnyBackupKey: boolean;
  walletKeys: WalletExtendedPublicKey[];
}

interface UpdateKeyParams {
  index: number;
  key: WalletExtendedPublicKey;
}

// --- STORE ---
export const useWalletInstanceStore = defineStore('WALLET_INSTANCE_STORE', () => {
  // --- STATE ---
  const walletInstanceLoading = ref(false);
  const walletState = reactive<WalletStoreState>({
    id: '',
    name: '',
    walletConfig: undefined,
  });

  const walletKeysState = reactive<WalletKeysStoreState>({
    allWalletKeysAreFullySetUp: false,
    allUsersKeysAreFullySetUp: false,
    hasEmptyAnyBackupKey: false,
    walletKeys: [],
  });

  // Instance reference
  let walletInstance: Wallet | null = null;

  // --- COMPUTED ---
  const allUsersKeysAreFullySetUp = computed(() => walletKeysState.allUsersKeysAreFullySetUp);

  const allKeysAreFullySetUp = computed(() => walletKeysState.allWalletKeysAreFullySetUp);

  const walletConfig = computed(() => walletState.walletConfig);

  const walletKeysList = computed(() => walletKeysState.walletKeys);

  const isInitialized = computed(() => walletInstance !== null);

  // --- ACTIONS ---
  const updateKeyOnIndex = async (params: UpdateKeyParams): Promise<boolean> => {
    if (!walletInstance) {
      console.error('updateKeyOnIndex: wallet not initialized');
      return false;
    }

    // Update key - auto-generation of backup keys is handled internally by WalletKeysManager
    return await walletInstance.getKeysManager().updateKey(params.index, params.key);
  };

  const generateBackupKeys = async (): Promise<boolean> => {
    if (!walletInstance) {
      console.error('generateBackupKeys: wallet not initialized');
      return false;
    }

    return walletInstance.getKeysManager().generateBackupKeys();
  };

  const updateWalletName = (name: string): void => {
    if (!walletInstance) {
      console.error('updateWalletName: wallet not initialized');
      return;
    }
    walletInstance.updateName(name);
  };

  const initWalletConfig = (config: WalletConfigType): void => {
    walletInstanceLoading.value = true;

    try {
      if (!config) {
        throw new Error('Config is required');
      }

      // Clear previous instance if exists
      if (walletInstance) {
        clearWalletInstanceStore();
      }

      // Create new wallet instance
      const initialConfig = deepClone(config);
      walletInstance = new Wallet(initialConfig);

      // Setup state update handlers
      const updateWalletState = (state: WalletState) => {
        walletState.id = state.id;
        walletState.name = state.name;
        walletState.walletConfig = state.config;
      };

      const updateKeysState = (keysState: WalletKeysState) => {
        walletKeysState.allWalletKeysAreFullySetUp = keysState.allWalletKeysAreFullySetUp;
        walletKeysState.allUsersKeysAreFullySetUp = keysState.allUsersKeysAreFullySetUp;
        walletKeysState.hasEmptyAnyBackupKey = keysState.hasEmptyAnyBackupKey;
        walletKeysState.walletKeys = [...keysState.walletKeys];
      };

      // Set initial state
      const initialState = walletInstance.getState();
      updateWalletState(initialState);
      updateKeysState(initialState.keysState);

      // Subscribe to future changes
      walletInstance.addObserver({
        update: updateWalletState,
      });

      walletInstance.getKeysManager().addObserver({
        update: updateKeysState,
      });
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
      clearWalletInstanceStore();
    } finally {
      walletInstanceLoading.value = false;
    }
  };

  const clearWalletInstanceStore = (): void => {
    // Clear wallet instance
    if (walletInstance) {
      walletInstance.clear();
      walletInstance = null;
    }

    // Reset state
    walletState.id = '';
    walletState.name = '';
    walletState.walletConfig = undefined;

    walletKeysState.allWalletKeysAreFullySetUp = false;
    walletKeysState.allUsersKeysAreFullySetUp = false;
    walletKeysState.hasEmptyAnyBackupKey = false;
    walletKeysState.walletKeys = [];

    walletInstanceLoading.value = false;
  };

  // Utility function to get raw wallet instance (if needed)
  const getWalletInstance = (): Wallet | null => {
    return walletInstance;
  };

  // --- RETURN PUBLIC API ---
  return {
    // State
    walletInstanceLoading,
    isInitialized,

    // Computed
    allKeysAreFullySetUp,
    allUsersKeysAreFullySetUp,
    walletKeysList,
    walletConfig,

    // Actions
    initWallet: initWalletConfig,
    updateKeyOnIndex,
    generateBackupKeys,
    updateWalletName,
    clearWalletInstanceStore,
    getWalletInstance,

    // Utility export
    extendedPublicKeyIsSetUp,
  };
});
