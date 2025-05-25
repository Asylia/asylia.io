import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import cloneDeep from 'lodash.clonedeep';
import type { WalletConfigType } from '@shared/types/WalletStructure';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';
import { allKeysAreFullySetUp as _allKeysAreFullySetUp } from '@packages/asylia-wallets/CreateWallet';

const STORE_KEY = 'WALLET_INSTANCE_STORE';

export const useWalletInstanceStore = defineStore(STORE_KEY, () => {
  const walletInstanceLoading = ref(false);
  const initWallet = (config: WalletConfigType) => {
    walletInstanceLoading.value = true;
    initWalletConfig(config);
    walletInstanceLoading.value = false;
  };

  /*
   * Wallet config
   */
  const _walletConfig = ref<WalletConfigType | undefined>(undefined);
  const walletConfig = computed(() => _walletConfig.value);
  const initWalletConfig = (config: WalletConfigType) => {
    if (!config) {
      console.error('initWalletConfig: config is undefined');
      return;
    }
    _walletConfig.value = cloneDeep(config);
  };

  /*
   * Wallet Keys
   */
  const walletKeysList = computed<WalletExtendedPublicKey[] | undefined>(
    () => walletConfig.value?.extendedPublicKeys,
  );

  const allKeysAreFullySetUp = computed<boolean>(() => {
    return _allKeysAreFullySetUp(walletKeysList.value);
  });

  /*
   * Clear the wallet instance store
   */
  const clearWalletInstanceStore = () => {
    _walletConfig.value = undefined;
  }

  return {
    initWallet,
    clearWalletInstanceStore,
    walletKeysList,
    allKeysAreFullySetUp,
    walletConfig
  };
});
