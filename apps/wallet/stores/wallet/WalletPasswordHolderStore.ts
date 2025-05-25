import { defineStore } from 'pinia';

const STORE_KEY = 'WALLET_PASSWORD_HOLDER_STORE';

export const useWalletPasswordHolderStore = defineStore(STORE_KEY, () => {
  const _tempPasswordHolder = ref<Record<string, string>>({});

  const setTempPasswordHolder = (walletId: string, password: string) => {
    _tempPasswordHolder.value[walletId] = password;
  };
  const getTempPasswordHolder = (walletId: string) => {
    return _tempPasswordHolder.value[walletId];
  };
  const clearTempPasswordHolder = (walletId: string) => {
    delete _tempPasswordHolder.value[walletId];
  };
  const clearAllTempPasswordHolders = () => {
    _tempPasswordHolder.value = {};
  };

  return {
    setTempPasswordHolder,
    getTempPasswordHolder,
    clearTempPasswordHolder,
    clearAllTempPasswordHolders,
  };
});
