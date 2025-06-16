import type { BitcoinNetworkTypes } from '~/stores/bitcoin/network/types';
import type { WalletExtendedPublicKeyType } from '~/stores/wallet/p2wsh/keys/types';

export type WalletQuorumType = {
  requiredSigners: number;
  totalSigners: number;
};

export type WalletConfigType = {
  id: string;
  name: string;
  addressType: 'P2SH_P2WSH';
  network: BitcoinNetworkTypes;
  version: number;
  client: {
    type: 'PUBLIC';
  };
  quorum: WalletQuorumType;
  extendedPublicKeys: WalletExtendedPublicKeyType[];
  startingAddressIndex: number;
};
