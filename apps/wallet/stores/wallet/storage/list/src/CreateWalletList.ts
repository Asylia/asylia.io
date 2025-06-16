import type {
  DecryptedWalletListItemType,
  EncryptedWalletListItemType,
} from '~/stores/wallet/storage/list/types';
import type { WalletConfigType } from '~/stores/wallet/p2wsh/config/types';
import type { EncryptedWalletConfigType } from '~/stores/wallet/storage/encryption/types';

export const extractBaseWalletInfoFromWalletConfig = (
  walletConfig: Pick<WalletConfigType, 'id' | 'name' | 'version'>,
) => ({
  id: walletConfig.id,
  name: walletConfig.name || `New Wallet ${walletConfig.id.slice(0, 4)}`,
  version: 1,
});

export const createDecryptedWalletListItemFromConfig = (
  walletConfig: WalletConfigType,
): DecryptedWalletListItemType => {
  const { id, name, version } = extractBaseWalletInfoFromWalletConfig(walletConfig);
  const isDecrypted = true;

  return {
    id,
    name,
    version,
    isDecrypted,
    config: walletConfig,
  };
};

export const createEncryptWalletListItem = async (
  encryptedConfig: EncryptedWalletConfigType,
  payload: {
    id: string;
    name: string;
    version?: number;
  },
): Promise<EncryptedWalletListItemType> => {
  const isDecrypted = false;

  const { id, name, version } = extractBaseWalletInfoFromWalletConfig(payload);
  return {
    id,
    name,
    version,
    isDecrypted,
    config: encryptedConfig,
  };
};
