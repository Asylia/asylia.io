import { defineStore } from 'pinia';
import type { WalletConfigType } from '~/stores/wallet/p2wsh/config/types';

const WALLET_STATE_STORE = 'WALLET_STATE_STORE';

export const useWalletStateSore = defineStore(WALLET_STATE_STORE, () => {
  // === State ===
  const _walletConfig = ref<WalletConfigType | undefined>(undefined);

  // === getters ===
  const walletConfig = computed<WalletConfigType>(() => {
    if (!_walletConfig.value) throw new Error('Wallet config is not set!');
    return _walletConfig.value;
  });

  // === actions ===
  const setWalletConfig = (config: WalletConfigType) => {
    _walletConfig.value = config;
  };

  return {
    // State
    walletConfig,

    // Actions
    setWalletConfig,
  };
});
