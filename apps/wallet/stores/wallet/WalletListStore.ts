import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  type EncryptedWalletListItem,
  getEncryptedWalletList,
  type WalletListItem,
} from '@packages/asylia-wallets/WalletStorage';
import cloneDeep from 'lodash.clonedeep';
import { useWalletInstanceStore } from '~/stores/wallet/WalletIInstanceStore';

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
    const walletListFromLocalStorage = cloneDeep(getEncryptedWalletList()) || [];
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

  const selectedWalletId = ref<string | undefined>();
  const setSelectedWalletId = (id: string) => {
    selectedWalletId.value = id;
  };

  const selectedWallet = computed<WalletListItem | undefined>(() => {
    return walletList.value.find((wallet) => wallet.id === selectedWalletId.value);
  });
  const selectedWalletIndex = computed<number | undefined>(() => {
    return walletList.value.findIndex((wallet) => wallet.id === selectedWalletId.value);
  });

  const updateSelectedWallet = (updatedWallet: WalletListItem) => {
    if (selectedWalletIndex.value === undefined) return;
    _walletList.value[selectedWalletIndex.value] = updatedWallet;
  };

  const selectedWalletIsUnlocked = computed(() => {
    return selectedWallet.value?.isDecrypted === true;
  });

  const lockSelectedWallet = () => {
    const walletLockedConfig = cloneDeep(
      _originalLocalStorageWalletListMap.value[selectedWalletId.value ?? -1],
    );
    if (!walletLockedConfig) {
      console.error(`lockWallet: No original wallet config found for walletId: ${selectedWalletId.value}`);
      return;
    }
    updateSelectedWallet(walletLockedConfig);
    walletInstanceStore.clearWalletInstanceStore();
  };

  return {
    walletList,
    selectedWallet,
    selectedWalletIsUnlocked,
    initStore,
    setSelectedWalletId,
    updateSelectedWallet,
    addWalletToList,
    lockSelectedWallet,
  };
});
