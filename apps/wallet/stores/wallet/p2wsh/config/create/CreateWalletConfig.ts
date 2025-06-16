import type { WalletConfigType } from '~/stores/wallet/p2wsh/config/types';
import type { createWalletConfigFunctionType } from '~/stores/wallet/p2wsh/config/create/types';
import { BITCOIN_NETWORK } from '~/stores/bitcoin/network/BitcoinNetwork';

export const createWalletConfig: createWalletConfigFunctionType = (payload) => {
  let { id, name, network, quorum, extendedPublicKeys, startingAddressIndex } = payload;

  if (!quorum) {
    throw new Error('Quorum is required');
  }

  if (!id) id = crypto.randomUUID();
  if (!name) name = 'New Wallet';
  if (!network) network = BITCOIN_NETWORK.MAINNET;
  if (!extendedPublicKeys) extendedPublicKeys = [];
  if (!startingAddressIndex) startingAddressIndex = 0;

  const newWalletConfig: WalletConfigType = {
    id,
    name,
    addressType: 'P2SH_P2WSH',
    network,
    client: {
      type: 'PUBLIC',
    },
    quorum,
    extendedPublicKeys,
    startingAddressIndex,
  };

  return newWalletConfig;
};
