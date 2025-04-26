export const WalletMultiSignatureTypes = Object.freeze({
  BACKUP: 'BACKUP',
  CONSIGNER: 'CONSIGNER',
  MULTISIG: 'MULTISIG',
} as const);

export type WalletMultiSignatureType = keyof typeof WalletMultiSignatureTypes;

export const WalletBackupAnCosignerKeyVariants = Object.freeze({
  '2of3': '2of3',
  '3of5': '3of5',
});

export type WalletBackupAnCosignerKeyVariants =  keyof typeof WalletBackupAnCosignerKeyVariants;

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
  [WalletBackupAnCosignerKeyVariants['2of3']]: {
    m: 2,
    n: 3,
  },
  [WalletBackupAnCosignerKeyVariants['3of5']]: {
    m: 3,
    n: 5,
  },
});

export type WalletBackupAnCosignerKeyVariantsQuorumType =
  keyof typeof WalletBackupAnCosignerKeyVariantsQuorum;

export const SCENARIO_ACTIVE_INACTIVE = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
});

export type ScenarioActiveInactiveType = keyof typeof SCENARIO_ACTIVE_INACTIVE;
