import type { SignMethodsListType, EmptySignMethodType } from './sign/method/types';

export type WalletExtendedPublicKeyType = {
  name: string;
  bip32Path: string;
  xpub: string;
  xfp: string;
  method: SignMethodsListType | EmptySignMethodType;
  xpriv?: string | undefined; // Optional, used for private keys if needed
};
