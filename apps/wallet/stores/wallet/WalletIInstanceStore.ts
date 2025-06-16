import { defineStore } from 'pinia';
import type { WalletConfigType } from '@shared/types/WalletStructure';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';
import { useWallet, extendedPublicKeyIsSetUp } from '@packages/asylia-wallets/CreateWallet';

export const useWalletInstanceStore = defineStore('WALLET_INSTANCE_STORE', () => {
  // Initialize the wallet composable
  const wallet = useWallet();

  // Direct access to all wallet composable properties and methods
  const {
    // State
    isLoading: walletInstanceLoading,
    isInitialized,
    walletConfig,
    walletId,
    walletName,

    // Keys state
    walletKeys: walletKeysList,
    allKeysFullySetUp: allKeysAreFullySetUp,
    allUsersKeysFullySetUp,
    hasEmptyBackupKeys: hasEmptyAnyBackupKey,

    // Methods
    initWallet,
    updateWalletName,
    updateKeyOnIndex,
    generateBackupKeys,
    clearWallet: clearWalletInstanceStore,
  } = wallet;

  return {
    // State
    walletInstanceLoading,
    isInitialized,

    // Computed
    allKeysAreFullySetUp,
    // allUsersKeysAreFullySetUp,
    walletKeysList,
    walletConfig,
    walletId,
    walletName,
    hasEmptyAnyBackupKey,

    // Actions
    initWallet,
    updateKeyOnIndex,
    generateBackupKeys,
    updateWalletName,
    clearWalletInstanceStore,

    // Utility export
    extendedPublicKeyIsSetUp,
  };
});
