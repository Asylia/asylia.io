import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import cloneDeep from 'lodash.clonedeep';
import type { WalletConfigType } from '@shared/types/WalletStructure';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';
import {
  allKeysAreFullySetUp as _allKeysAreFullySetUp,
  extendedPublicKeyIsSetUp,
  USER_KEYS_LIST,
} from '@packages/asylia-wallets/CreateWallet';
import type {
  EncryptedWalletListItem,
  DecryptedWalletListItem,
} from '@packages/asylia-wallets/WalletStorage';
import { useWalletPasswordHolderStore } from '~/stores/wallet/WalletPasswordHolderStore';
import { encryptJson } from '@packages/asylia-wallets/WalletStorageEncryption';
import { useWalletListStore } from '~/stores/wallet/WalletListStore';

const STORE_KEY = 'WALLET_INSTANCE_STORE';

export const useWalletInstanceStore = defineStore(STORE_KEY, () => {
  // store
  const walletListStore = useWalletListStore();

  const walletInstanceLoading = ref(false);
  const initWallet = (config: WalletConfigType, version: number) => {
    walletInstanceLoading.value = true;
    initWalletConfig(config, version);
    walletInstanceLoading.value = false;
  };

  /*
   * Wallet config
   */
  const _walletConfig = ref<WalletConfigType | undefined>(undefined);
  const walletConfig = computed<WalletConfigType | undefined>(() => _walletConfig.value);
  const walletConfigVersion = ref(0);
  const initWalletConfig = (config: WalletConfigType, version: number) => {
    if (!config) {
      console.error('initWalletConfig: config is undefined');
      return;
    }
    _walletConfig.value = cloneDeep(config);
    walletConfigVersion.value = version;
  };

  type GetDecryptedWalletConfigType = () => DecryptedWalletListItem | undefined;
  const getDecryptedWalletConfig: GetDecryptedWalletConfigType = () => {
    if (!walletConfig.value) {
      console.error('getEncryptedWalletConfig: walletConfig is undefined');
      return undefined;
    }

    const config = cloneDeep(walletConfig.value);
    const decryptedWallet: DecryptedWalletListItem = {
      id: walletConfig.value.id,
      name: walletConfig.value.name,
      version: walletConfigVersion.value,
      isDecrypted: true,
      config,
    };

    return decryptedWallet;
  };

  type GetEncryptedWalletConfigType = () => Promise<EncryptedWalletListItem | undefined>;
  const getEncryptedWalletConfig: GetEncryptedWalletConfigType = async () => {
    const decryptedWalletConfig = getDecryptedWalletConfig();
    if (!decryptedWalletConfig) {
      console.error('getEncryptedWalletConfig: decryptedWallet is undefined');
      return undefined;
    }

    const walletPasswordStore = useWalletPasswordHolderStore();
    console.log('decryptedWalletConfig.id', decryptedWalletConfig.id);
    const walletPassword = walletPasswordStore.getTempPasswordHolder(decryptedWalletConfig.id);

    if (!walletPassword) {
      console.error('getEncryptedWalletConfig: walletPassword is undefined');
      return undefined;
    }

    console.log('decryptedWallet', decryptedWalletConfig);

    try {
      const { encrypted, salt, iv } = await encryptJson(
        decryptedWalletConfig.config,
        walletPassword,
      );

      const encryptedWalletListItem: EncryptedWalletListItem = {
        id: decryptedWalletConfig.id,
        version: decryptedWalletConfig.version,
        name: decryptedWalletConfig.name,
        isDecrypted: false,
        config: {
          encrypted,
          salt,
          iv,
        },
      };

      return encryptedWalletListItem;
    } catch (e) {
      console.error('getEncryptedWalletConfig: Error during encryption', e);
      return undefined;
    }
  };

  const saveWalletConfig = async (): Promise<boolean> => {
    const encryptedWalletConfig = await getEncryptedWalletConfig();
    const decryptedWalletConfig = getDecryptedWalletConfig();
    if (!encryptedWalletConfig || !decryptedWalletConfig) {
      console.error(
        'saveWalletConfig: encryptedWalletConfig or decryptedWalletConfig is undefined',
      );
      return false;
    }
    return walletListStore.updateSelectedWallet(decryptedWalletConfig, encryptedWalletConfig);
  };

  /*
   * Wallet Keys
   */
  const walletKeysList = computed<WalletExtendedPublicKey[] | undefined>(
    () => walletConfig.value?.extendedPublicKeys,
  );

  const updateKey = (payload: { index: number; key: WalletExtendedPublicKey }): boolean => {
    if (!_walletConfig.value?.extendedPublicKeys?.[payload.index]) return false;
    _walletConfig.value.extendedPublicKeys[payload.index] = payload.key;
    return true;
  };

  const allKeysAreFullySetUp = computed<boolean>(() => {
    return _allKeysAreFullySetUp(walletKeysList.value);
  });

  const allUsersKeysAreFullySetUp = computed<boolean>(() => {
    const userKeys =
      walletKeysList.value?.filter(
        (key) => extendedPublicKeyIsSetUp(key) && USER_KEYS_LIST.includes(key.method),
      ) ?? [];

    return userKeys?.length === walletConfig.value?.quorum.requiredSigners;
  });

  watch(allUsersKeysAreFullySetUp, (setup) => {
    if (!setup) return;



  });

  /*
   * Clear the wallet instance store
   */
  const clearWalletInstanceStore = () => {
    _walletConfig.value = undefined;
  };

  return {
    initWallet,
    clearWalletInstanceStore,
    updateKey,
    getDecryptedWalletConfig,
    getEncryptedWalletConfig,
    saveWalletConfig,
    allUsersKeysAreFullySetUp,
    walletKeysList,
    allKeysAreFullySetUp,
    walletConfig,
  };
});
