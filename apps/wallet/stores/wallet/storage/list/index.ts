// Re-export - wallet storage list related functionalities and types
import {
  createEncryptWalletListItem,
  extractBaseWalletInfoFromWalletConfig,
  createDecryptedWalletListItemFromConfig,
} from '~/stores/wallet/storage/list/src/CreateWalletList';
import { useWalletListStore } from '~/stores/wallet/storage/list/src/UseWalletList';

export {
  useWalletListStore as useWalletStorageListStore,
  createEncryptWalletListItem,
  extractBaseWalletInfoFromWalletConfig,
  createDecryptedWalletListItemFromConfig,
};

// types
import type {
  DecryptedWalletListItemType,
  EncryptedWalletListItemType,
  WalletListItemType,
} from '~/stores/wallet/storage/list/types';

export type { DecryptedWalletListItemType, EncryptedWalletListItemType, WalletListItemType };
