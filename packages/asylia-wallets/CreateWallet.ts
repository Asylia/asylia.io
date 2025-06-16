import { ref, computed, watch, reactive } from 'vue';
import type { WalletConfigType } from '@shared/types/WalletStructure';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';
import { EMPTY_SIGN_DEVICE_METHOD, SIGN_DEVICES_LIST } from '@shared/types/SignKeys';
import { generateSignKey, MULTISIG_ACCOUNT_PATH } from '@packages/asylia-wallets/p2wsh';
import deepClone from 'deep-clone';

// --- CONSTANTS ---
const USER_KEYS_LIST = [
  SIGN_DEVICES_LIST.TREZOR,
  SIGN_DEVICES_LIST.LEDGER,
  SIGN_DEVICES_LIST.MOBILE_APP,
] as const;

// --- UTILITY FUNCTIONS ---
export const extendedPublicKeyIsSetUp = (key: WalletExtendedPublicKey): boolean => {
  return key?.method !== EMPTY_SIGN_DEVICE_METHOD && !!key?.xpub?.length && !!key?.xfp?.length;
};

export const isEmptyBackupKey = (key: WalletExtendedPublicKey): boolean => {
  return key.method === SIGN_DEVICES_LIST.ASYLIA && !extendedPublicKeyIsSetUp(key);
};

export const isUserKey = (key: WalletExtendedPublicKey): boolean => {
  return USER_KEYS_LIST.includes(key.method as any);
};

// --- WALLET KEYS COMPOSABLE ---
export function useWalletKeys() {
  const keys = ref<WalletExtendedPublicKey[]>([]);
  const requiredSigners = ref(0);
  const autoGenessrateBackupKeys = ref(true);

  // Computed properties
  const allKeysFullySetUp = computed(() => {
    return keys.value.length > 0 && keys.value.every((key) => extendedPublicKeyIsSetUp(key));
  });

  const allUsersKeysFullySetUp = computed(() => {
    if (!keys.value.length || requiredSigners.value === 0) return false;

    const userKeys = keys.value.filter((key) => extendedPublicKeyIsSetUp(key) && isUserKey(key));

    return userKeys.length === requiredSigners.value;
  });

  const hasEmptyBackupKeys = computed(() => {
    return !allKeysFullySetUp.value && keys.value.some((key) => isEmptyBackupKey(key));
  });

  // Methods
  const updateKey = async (index: number, key: WalletExtendedPublicKey): Promise<boolean> => {
    if (index < 0 || index >= keys.value.length) {
      console.error(`Invalid key index: ${index}`);
      return false;
    }

    keys.value[index] = key;
    return true;
  };

  const generateBackupKeys = async (): Promise<boolean> => {
    if (allKeysFullySetUp.value) {
      console.warn('All wallet keys are already fully set up');
      return true;
    }

    if (!allUsersKeysFullySetUp.value) {
      console.warn('Cannot generate backup keys: user keys are not fully set up');
      return false;
    }

    try {
      const updates = await Promise.all(
        keys.value.map(async (key, index) => {
          if (!isEmptyBackupKey(key)) {
            return null;
          }

          const generatedKey = await generateSignKey();
          return {
            index,
            key: {
              name: key.name || `Asylia Sign Key ${index + 1}`,
              bip32Path: key.bip32Path || MULTISIG_ACCOUNT_PATH,
              xfp: generatedKey.xfp,
              method: SIGN_DEVICES_LIST.ASYLIA,
              xpub: generatedKey.xpub,
              xpriv: generatedKey.xpriv,
            } as WalletExtendedPublicKey,
          };
        }),
      );

      // Apply updates
      const validUpdates = updates.filter(Boolean) as Array<{
        index: number;
        key: WalletExtendedPublicKey;
      }>;
      validUpdates.forEach(({ index, key }) => {
        keys.value[index] = key;
      });

      return true;
    } catch (error) {
      console.error('Failed to generate backup keys:', error);
      return false;
    }
  };

  const setKeys = (newKeys: WalletExtendedPublicKey[]) => {
    keys.value = [...newKeys];
  };

  const setRequiredSigners = (count: number) => {
    requiredSigners.value = count;
  };

  const clearKeys = () => {
    keys.value = [];
    requiredSigners.value = 0;
  };

  // Auto-generate backup keys when user keys are complete
  watch(allUsersKeysFullySetUp, async (newValue) => {
    if (newValue && hasEmptyBackupKeys.value) {
      console.log(
        'All user keys are set up, auto-generating backup keys...',
        hasEmptyBackupKeys.value,
      );
      const success = await generateBackupKeys();
      console.log('success', success);
      if (!success) {
        console.error('Failed to auto-generate backup keys');
      }
    }
  });

  return {
    // State
    keys: computed(() => keys.value),
    requiredSigners: computed(() => requiredSigners.value),

    // Computed
    allKeysFullySetUp,
    allUsersKeysFullySetUp,
    hasEmptyBackupKeys,

    // Methods
    updateKey,
    generateBackupKeys,
    setKeys,
    setRequiredSigners,
    clearKeys,
  };
}

// --- MAIN WALLET COMPOSABLE ---
export function useWallet(initialConfig?: WalletConfigType) {
  const isLoading = ref(false);
  const walletConfig = ref<WalletConfigType | undefined>(
    initialConfig ? deepClone(initialConfig) : undefined,
  );

  // Initialize wallet keys composable
  const {
    keys: walletKeys,
    allKeysFullySetUp,
    allUsersKeysFullySetUp,
    hasEmptyBackupKeys,
    updateKey,
    generateBackupKeys,
    setKeys,
    setRequiredSigners,
    clearKeys,
  } = useWalletKeys();

  // Computed properties
  const isInitialized = computed(() => !!walletConfig.value);
  const walletId = computed(() => walletConfig.value?.id || '');
  const walletName = computed(() => walletConfig.value?.name || '');

  // Keep config in sync with keys
  watch(
    walletKeys,
    (newKeys) => {
      if (walletConfig.value) {
        walletConfig.value.extendedPublicKeys = [...newKeys];
      }
    },
    { deep: true },
  );

  // Methods
  const initWallet = (config: WalletConfigType) => {
    isLoading.value = true;

    try {
      if (!config) {
        throw new Error('Config is required');
      }

      walletConfig.value = deepClone(config);
      setKeys(config.extendedPublicKeys || []);
      setRequiredSigners(config.quorum?.requiredSigners || 0);
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
      clearWallet();
    } finally {
      isLoading.value = false;
    }
  };

  const updateWalletName = (name: string) => {
    if (!walletConfig.value) {
      console.error('updateWalletName: wallet not initialized');
      return;
    }
    walletConfig.value.name = name;
  };

  const updateKeyOnIndex = async (params: {
    index: number;
    key: WalletExtendedPublicKey;
  }): Promise<boolean> => {
    if (!walletConfig.value) {
      console.error('updateKeyOnIndex: wallet not initialized');
      return false;
    }

    return await updateKey(params.index, params.key);
  };

  const clearWallet = () => {
    walletConfig.value = undefined;
    clearKeys();
    isLoading.value = false;
  };

  // Initialize if config provided
  if (initialConfig) {
    initWallet(initialConfig);
  }

  return {
    // State
    isLoading,
    isInitialized,
    walletConfig: computed(() => walletConfig.value),
    walletId,
    walletName,

    // Keys state
    walletKeys,
    allKeysFullySetUp,
    allUsersKeysFullySetUp,
    hasEmptyBackupKeys,

    // Methods
    initWallet,
    updateWalletName,
    updateKeyOnIndex,
    generateBackupKeys,
    clearWallet,
  };
}
