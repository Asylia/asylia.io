import type { WalletConfigType } from '~/stores/wallet/p2wsh/config/types';
import type { EncryptedWalletConfigType } from '~/stores/wallet/storage/encryption/types';

type BaseWalletListItemType = {
  id: string;
  name: string;
  version: number;
  isDecrypted: boolean;
};

export type DecryptedWalletListItemType = BaseWalletListItemType & {
  isDecrypted: true;
  config: WalletConfigType;
};

export type EncryptedWalletListItemType = BaseWalletListItemType & {
  isDecrypted: false;
  config: EncryptedWalletConfigType;
};

export type WalletListItemType = EncryptedWalletListItemType | DecryptedWalletListItemType;

export type WalletListMapType = Record<string, WalletListItemType>;
