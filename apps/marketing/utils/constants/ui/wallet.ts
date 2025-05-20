import {WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS} from "@shared/components/wallet/setup/quorum/Types";

export type customSchemaType = {
  enabled: boolean;
  m: number;
  n: number;
};

export type Quorum = {
  m: number;
  n: number;
};

export const WalletBackupAnCosignerKeyVariantsQuorum = Object.freeze({
  [WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3']]: {
    m: 2,
    n: 3,
  },
  [WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['3of5']]: {
    m: 3,
    n: 5,
  },
});

export type WalletBackupAnCosignerKeyVariantsQuorumType =
  keyof typeof WalletBackupAnCosignerKeyVariantsQuorum;

