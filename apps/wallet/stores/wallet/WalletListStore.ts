import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getEncryptedWalletList,
  type EncryptedWalletListItem,
  type WalletListItem,
  type DecryptedWalletListItem,
  setRawToStorage,
} from '@packages/asylia-wallets/WalletStorage';
import { useWalletInstanceStore } from '~/stores/wallet/WalletIInstanceStore';
import { encryptJson } from '@packages/asylia-wallets/WalletStorageEncryption';
import deepClone from 'deep-clone'

const STORE_KEY = 'WALLET_LIST_STORE';

export const useWalletListStore = defineStore(STORE_KEY, () => {
  /*
   * Stores
   */
  const walletInstanceStore = useWalletInstanceStore();

  /*
   * Load wallet list from local storage
   * use flag to ensure it is only loaded once
   */
  const _storeInitialized = ref(false);
  const _walletList = ref<WalletListItem[]>([]);
  const _originalLocalStorageWalletListMap = ref<Record<string, EncryptedWalletListItem>>({});
  const walletList = computed(() => _walletList.value);

  const initStore = () => {
    if (_storeInitialized.value) return;
    const walletListFromLocalStorage = deepClone(getEncryptedWalletList()) || [];
    const alreadyLoadedIdList = _walletList.value.map((wallet) => wallet.id);

    for (let singleWallet of walletListFromLocalStorage) {
      _originalLocalStorageWalletListMap.value[singleWallet.id] = singleWallet;
      // If the wallet is already loaded, skip it
      if (alreadyLoadedIdList.includes(singleWallet.id)) continue;
      _walletList.value.push(singleWallet);
    }
    _storeInitialized.value = true;
  };

  const addWalletToList = (wallet: WalletListItem) => {
    _walletList.value.push(wallet);
  };

  const _selectedWalletId = ref<string | undefined>();
  const selectedWalletId = computed(() => _selectedWalletId.value);
  const setSelectedWalletId = (id: string) => {
    _selectedWalletId.value = id;
  };

  const selectedWallet = computed<WalletListItem | undefined>(() => {
    return walletList.value.find((wallet) => wallet.id === selectedWalletId.value);
  });
  const selectedWalletIndex = computed<number | undefined>(() => {
    return walletList.value.findIndex((wallet) => wallet.id === selectedWalletId.value);
  });

  const updateSelectedWallet = (
    decryptedWallet: DecryptedWalletListItem,
    encryptedWallet?: EncryptedWalletListItem,
  ): boolean => {
    if (selectedWalletIndex.value === undefined) return false;
    _walletList.value[selectedWalletIndex.value] = decryptedWallet;

    if (!encryptedWallet) return true;
    _originalLocalStorageWalletListMap.value[decryptedWallet.id] = encryptedWallet;
    return true;
  };

  const syncWalletListToLocalStorage = () => {
    const encryptedWalletList = Object.values(_originalLocalStorageWalletListMap.value);
    setRawToStorage(encryptedWalletList);
  };

  const selectedWalletIsUnlocked = computed(() => {
    return selectedWallet.value?.isDecrypted === true;
  });

  const lockSelectedWallet = () => {
    const walletLockedConfig = deepClone(
      _originalLocalStorageWalletListMap.value[selectedWalletId.value ?? -1],
    );
    console.log('walletLockedConfig', walletLockedConfig);
    if (!walletLockedConfig || selectedWalletIndex.value === undefined) {
      console.error(
        `lockWallet: No original wallet config found for walletId: ${selectedWalletId.value}`,
      );
      return;
    }
    _walletList.value[selectedWalletIndex.value] = walletLockedConfig;
    walletInstanceStore.clearWalletInstanceStore();
  };

  return {
    walletList,
    selectedWallet,
    selectedWalletIsUnlocked,
    selectedWalletId,
    initStore,
    setSelectedWalletId,
    updateSelectedWallet,
    syncWalletListToLocalStorage,
    addWalletToList,
    lockSelectedWallet,
  };
});
