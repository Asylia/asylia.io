import { WALLET_CLIENT_TYPES, type WalletConfigType } from '@shared/types/WalletStructure';
import { WALLET_ADDRESS_TYPES } from '@shared/types/WalletAddress';
import { BTC_NETWORK } from '@shared/Config';

export const EMPTY_WALLET_CONFIG_STATE: WalletConfigType = {
  name: '',
  addressType: WALLET_ADDRESS_TYPES.P2SH_P2WSH,
  network: BTC_NETWORK,
  client: {
    type: WALLET_CLIENT_TYPES.PUBLIC,
  },
  quorum: {
    requiredSigners: 2,
    totalSigners: 3,
  },
  extendedPublicKeys: [],
  startingAddressIndex: 0,
};

export const getEmptyWalletConfig = (): WalletConfigType => ({ ...EMPTY_WALLET_CONFIG_STATE });
