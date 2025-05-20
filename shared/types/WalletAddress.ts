/*
 * Different types of wallet addresses
 */
export const WALLET_ADDRESS_TYPES  = Object.freeze({
  P2SH_P2WSH: 'P2SH_P2WSH',
  P2TR: 'P2TR', // not supported yet
});

export type WalletAddressTypes = keyof typeof WALLET_ADDRESS_TYPES;
