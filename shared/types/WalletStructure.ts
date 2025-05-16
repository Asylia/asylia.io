/*
 * Introduction
 *
 */

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

/*
 * Wallet Quorum Pre Set Schema Options
 * These are the best practices for the wallet structure
 */
export const WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS = Object.freeze({
  '2of3': '2of3',
  '3of5': '3of5',
});

export type WalletQuorumPreSetSchemaOptionsType = keyof typeof WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS;
