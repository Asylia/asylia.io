import { hasAnyWalletsInLocalStorage } from '@packages/asylia-wallets/WalletStorage';

export default defineNuxtRouteMiddleware((to, from) => {
  if (!import.meta.client) return;
  if (hasAnyWalletsInLocalStorage()) return;
  return navigateTo('/');
});

export const MiddlewareName = 'redirect-to-home-if-no-wallet-in-local-storage-client';
