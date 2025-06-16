import type { BitcoinNetworkTypes } from '~/stores/bitcoin/network/types';
import type { WalletConfigType, WalletQuorumType } from '~/stores/wallet/p2wsh/config/types';
import type { WalletExtendedPublicKeyType } from '~/stores/wallet/p2wsh/keys/types';

type CreateWalletConfigParamsType = {
  id?: string;
  name: string;
  network?: BitcoinNetworkTypes;
  quorum: WalletQuorumType;
  extendedPublicKeys?: WalletExtendedPublicKeyType[];
  startingAddressIndex?: number;
};

export type createWalletConfigFunctionType = (
  payload: CreateWalletConfigParamsType,
) => WalletConfigType;
