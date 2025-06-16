import type { WalletExtendedPublicKeyType } from './types';
import { EMPTY_SIGN_DEVICE_METHOD, type WalletExtendedPublicKey } from '@shared/types/SignKeys';

export const EMPTY_WALLET_EXTENDED_PUBLIC_KEY: WalletExtendedPublicKeyType = {
  name: '',
  bip32Path: '',
  xpub: '',
  xfp: '',
  method: null,
  xpriv: undefined, // Optional, can be undefined if not needed
};

const extendedPublicKeyIsSetUp = (key: WalletExtendedPublicKey): boolean => {
  return key?.method !== EMPTY_SIGN_DEVICE_METHOD && !!key?.xpub?.length && !!key?.xfp?.length;
};

