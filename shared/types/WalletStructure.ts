/*
 * Introduction
 *
 */
import type { BitcoinNetworkTypes } from '@shared/types/Bitcoin';
import type { WalletAddressTypes } from '@shared/types/WalletAddress';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';

export type Quorum = {
  requiredSigners: number;
  totalSigners: number;
};

export const WALLET_CLIENT_TYPES = Object.freeze({
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
});
type WalletClientTypes = keyof typeof WALLET_CLIENT_TYPES;

/*
 * Wallet config structure schema
 */
export type WalletConfigType = {
  id: string;
  name: string;
  addressType: WalletAddressTypes;
  network: BitcoinNetworkTypes;
  client: {
    type: WalletClientTypes;
  };
  quorum: Quorum;
  extendedPublicKeys: WalletExtendedPublicKey[];
  startingAddressIndex: number;
};
