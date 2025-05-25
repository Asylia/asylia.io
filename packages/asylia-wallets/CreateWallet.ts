import { EMPTY_SIGN_DEVICE_METHOD, type WalletExtendedPublicKey } from '@shared/types/SignKeys';

export const extendedPublicKeyIsSetUp = (key: WalletExtendedPublicKey): boolean => {
  const methodOk = key?.method !== EMPTY_SIGN_DEVICE_METHOD;
  const xpubOk = !!(key?.xpub && key?.xpub.length > 0);
  const xfpOk = !!(key?.xfp && key?.xfp.length > 0);
  return methodOk && xpubOk && xfpOk;
};

export const allKeysAreFullySetUp = (keys: WalletExtendedPublicKey[] | undefined): boolean => {
  if (!keys || keys.length === 0) return false;
  return keys?.every(extendedPublicKeyIsSetUp);
};
