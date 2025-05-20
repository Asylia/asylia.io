/*
 * Base types for wallet structure
 * Only based how user interacts with the wallet
 * Under the hood, it is always a multisig wallet
 */
export const WALLET_STRUCTURE_TYPE = Object.freeze({
  BACKUP: 'BACKUP',
  CONSIGNER: 'CONSIGNER',
  MULTISIG: 'MULTISIG',
} as const);

export type WalletStructureType = keyof typeof WALLET_STRUCTURE_TYPE;

