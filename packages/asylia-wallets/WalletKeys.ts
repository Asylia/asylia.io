import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';
import { extendedPublicKeyIsSetUp, USER_KEYS_LIST } from '@packages/asylia-wallets/CreateWallet';

export const walletUserKeysAreFullySetUp = (
  walletKeysList: WalletExtendedPublicKey[],
  requiredSigners: number,
): boolean => {
  if (!walletKeysList || walletKeysList.length === 0 || requiredSigners === 0) return false;
  const userWalletKeys =
    walletKeysList.filter((key) => {
      return extendedPublicKeyIsSetUp(key) && USER_KEYS_LIST.includes(key.method as any);
    }) ?? [];
  return userWalletKeys.length === requiredSigners;
};

export const allWalletKeysAreFullySetUp = (
  keys: WalletExtendedPublicKey[] | undefined,
): boolean => {
  if (!keys || keys.length === 0) return false;
  return keys?.every(extendedPublicKeyIsSetUp);
};
