import { useWalletStorageListStore } from '~/stores/wallet/storage/list';

export default defineNuxtRouteMiddleware((to, from) => {
  if (!import.meta.client) return;

  const walletStorageListStore = useWalletStorageListStore();
  walletStorageListStore.load();

  if (walletStorageListStore.hasAny) {
    const firstWallet = walletStorageListStore.getFirst();
    return navigateTo({
      name: 'wallet-walletId',
      params: {
        walletId: firstWallet?.id,
      },
    });
  }
});

export const MiddlewareName = 'redirect-if-any-wallet-exists-in-local-storage-client';
