import type { WalletConfigType } from '~/stores/wallet/p2wsh/config/types';
import type {
  WalletListMapType,
  WalletListItemType,
  EncryptedWalletListItemType,
} from '~/stores/wallet/storage/list/types';
import { defineStore } from 'pinia';
import deepClone from 'deep-clone';
import { ref, computed } from 'vue';
import { getItem, hasItem } from '~/stores/wallet/storage/adapters/LocalStorageAdapter';
import { createDecryptedWalletListItemFromConfig } from '~/stores/wallet/storage/list/src/CreateWalletList';

const LOCAL_STORAGE_WALLETS_LIST_KEY = 'ASYLIA_LOCAL_STORAGE_WALLETS_LIST_KEY';
const USE_WALLET_LST_STORE_KEY = 'WALLET_LIST_STORE';

const useWalletListStore = defineStore(USE_WALLET_LST_STORE_KEY, () => {
  // === state ===
  const _list = ref<WalletListItemType[]>([]);
  const _walletListMap = ref<WalletListMapType>({});

  // === getters ===
  const all = computed<WalletListItemType[]>(() => _list.value);

  const hasAny = computed<boolean>(() => _list.value.length > 0);

  const walletMap = computed<WalletListMapType>(() => _walletListMap.value);

  // === actions ===

  function getWalletMap(walletId: string): WalletListItemType | undefined {
    return _walletListMap.value[walletId];
  }

  function load(): boolean {
    try {
      if (!hasItem(LOCAL_STORAGE_WALLETS_LIST_KEY)) return true;

      const walletsFromStorage = getItem(LOCAL_STORAGE_WALLETS_LIST_KEY) as WalletListItemType[];
      if (!Array.isArray(walletsFromStorage)) {
        console.error('Invalid wallet list format in local storage.');
        return false;
      }

      // set list
      _list.value = walletsFromStorage;
      // set map
      walletsFromStorage.forEach((wallet) => (_walletListMap.value[wallet.id] = wallet));

      return true;
    } catch (e) {
      console.error('Failed to load wallet list from local storage:', e);
      return false;
    }
  }

  function clear(): boolean {
    _list.value = [];
    _walletListMap.value = {};
    return true;
  }

  function reload(): boolean {
    return clear() && load();
  }

  function getFirst(): WalletListItemType | undefined {
    if (_list.value.length === 0) {
      console.warn('No wallets available.');
      return undefined;
    }
    return deepClone(_list.value[0]);
  }

  function findById(id: string): WalletListItemType | undefined {
    return deepClone(_list.value.find((w) => w.id === id));
  }

  function findByIndex(index: number): WalletListItemType | undefined {
    return deepClone(_list.value[index]);
  }

  const walletAlreadyExists = (id: string): boolean => {
    return !!findById(id) || !!_walletListMap.value[id];
  };

  function unlock(walletConfig: WalletConfigType): boolean {
    if (!walletAlreadyExists(walletConfig.id)) {
      console.warn(`Wallet with id ${walletConfig.id} does not exist.`);
      return false;
    }

    const decryptedWalletListItem = createDecryptedWalletListItemFromConfig(walletConfig);
    _walletListMap.value[decryptedWalletListItem.id] = decryptedWalletListItem;
    return true;
  }

  function lock(walletId: string): boolean {
    const wallet = findById(walletId);
    if (!wallet || wallet.isDecrypted) {
      console.warn(`Wallet with id ${walletId} is not found or already locked.`);
      return false;
    }
    // change in walletListMap by original List
    _walletListMap.value[walletId] = wallet;
    return true;
  }

  function add(wallet: EncryptedWalletListItemType): boolean {
    if (walletAlreadyExists(wallet.id)) {
      console.warn(`Wallet with id ${wallet.id} already exists.`);
      return false;
    }
    _list.value.push(wallet);
    _walletListMap.value[wallet.id] = wallet;
    return true;
  }

  function saveListToStorage() {
    try {
      localStorage.setItem(LOCAL_STORAGE_WALLETS_LIST_KEY, JSON.stringify(_list.value));
    } catch (e) {
      throw new Error(`Failed to save list: ${e}`);
    }
  }

  function removeById(id: string): boolean {
    const index = _list.value.findIndex((w) => w.id === id);
    if (index === -1) {
      console.warn(`Wallet with id ${id} not found.`);
      return false;
    }
    _list.value.splice(index, 1);
    return true;
  }

  const removeByIndex = (index: number): boolean => {
    if (index < 0 || index >= _list.value.length) {
      console.warn(`Index ${index} is out of bounds.`);
      return false;
    }
    _list.value.splice(index, 1);
    return true;
  };

  return {
    // getters
    all,
    hasAny,
    walletMap,
    // actions
    add,
    getWalletMap,
    load,
    getFirst,
    saveListToStorage,
    unlock,
    lock,
    walletAlreadyExists,
  };
});

export { useWalletListStore, LOCAL_STORAGE_WALLETS_LIST_KEY };
