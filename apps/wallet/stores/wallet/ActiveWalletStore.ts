import { defineStore } from 'pinia';
import { useWalletStorageListStore } from '~/stores/wallet/storage/list';
import { ref } from 'vue';
import type { WalletListItemType } from '~/stores/wallet/storage/list';

const ACTIVE_WALLET_STORE_KEY = 'ACTIVE_WALLET_STORE_KEY';

export const useActiveWalletStore = defineStore(ACTIVE_WALLET_STORE_KEY, () => {
  // === stores ===
  const walletStorageListStore = useWalletStorageListStore();

  const _activeWalletId = ref<string | undefined>(undefined);

  // === getters ===
  const hasActive = computed<boolean>(() => !!_activeWalletId.value);
  const activeWalletId = computed<string | undefined>(() => _activeWalletId.value);
  const activeWallet = computed<WalletListItemType | undefined>(() => {
    if (!_activeWalletId.value) return undefined;
    return walletStorageListStore.getWalletMap(_activeWalletId.value);
  });
  const activeWalletIsEncrypted = computed<boolean>(() => !activeWallet.value?.isDecrypted);

  // === actions ===
  function setActiveWallet(id: string): void {
    if (!walletStorageListStore.walletAlreadyExists(id)) {
      throw new Error('Wallet not found!');
    }
    _activeWalletId.value = id;
  }

  return {
    // === state ===
    activeWalletId,
    activeWallet,
    hasActive,
    activeWalletIsEncrypted,
    // === actions ===
    setActiveWallet,
  };
});
