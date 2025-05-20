import type { Quorum } from '@shared/types/WalletStructure';

/*
 * Wallet Quorum Pre Set Schema Options
 * These are the best practices for the wallet structure
 */
export const WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS = Object.freeze({
  '2of3': '2of3',
  '3of5': '3of5',
});
export type WalletQuorumPreSetSchemaOptionsType = keyof typeof WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS;

/*
 * Wallet Quorum Pre Set Schema Options
 * These are the best practices for the wallet structure
 */
export type WalletBackupAnCosignerKeyVariantsQuorumType = {
  [key in WalletQuorumPreSetSchemaOptionsType]: Quorum;
};

export const WALLET_PRESET_QUORUM: WalletBackupAnCosignerKeyVariantsQuorumType = {
  [WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3']]: {
    requiredSigners: 2,
    totalSigners: 3,
  },
  [WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['3of5']]: {
    requiredSigners: 3,
    totalSigners: 5,
  },
};

export type WalletPresetQuorumType = keyof typeof WALLET_PRESET_QUORUM;

/*
 * Custom schema just for UI switch
 * under the hood, it is always a multisig wallet with Quorum
 */
export type customSchemaType = Quorum & {
  enabled: boolean;
};
