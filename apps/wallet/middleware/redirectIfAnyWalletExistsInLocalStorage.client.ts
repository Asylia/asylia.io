import {
  hasAnyWalletsInLocalStorage,
  getFirstEncryptedWallet,
} from '@packages/asylia-wallets/WalletStorage';

export default defineNuxtRouteMiddleware((to, from) => {
  if (hasAnyWalletsInLocalStorage()) {
    const firstWallet = getFirstEncryptedWallet();
    return navigateTo({
      name: 'wallet-walletId',
      params: {
        walletId: firstWallet?.id,
      },
    });
  }
});

export const MiddlewareName = 'redirect-if-any-wallet-exists-in-local-storage-client';
