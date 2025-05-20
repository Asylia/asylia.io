<template>
  <component
    :is="walletTypeTableComponent"
    :key="`${walletType}-${activeInactive}-${keyVariant}`"
    :active-inactive="activeInactive"
    :wallet-type="walletType"
    :key-variant="keyVariant"
    :quorum="walletQuorum"
    :custom-schema="customSchema"
  />
</template>

<script setup lang="ts">
import MultisigRowBackupType from '@shared/components/help/multisigSchema/table/backupCosig/backupType/BackupType.vue';
import MultisigRowCoSignerType from '@shared/components/help/multisigSchema/table/backupCosig/cosignerType/CosignerType.vue';
import MultisigRowMultisigType from '@shared/components/help/multisigSchema/table/multisigType/MultisigType.vue';
import { WALLET_STRUCTURE_TYPE, type WalletStructureType } from '@shared/types/Wallet';
import {
  WALLET_PRESET_QUORUM,
  type customSchemaType,
  type WalletQuorumPreSetSchemaOptionsType,
} from '@shared/components/wallet/setup/quorum/Types';
import type { ScenarioActiveInactiveType } from '@shared/components/help/multisigSchema/types';

const props = defineProps<{
  walletType: WalletStructureType;
  keyVariant: WalletQuorumPreSetSchemaOptionsType;
  customSchema: customSchemaType;
  activeInactive: ScenarioActiveInactiveType;
}>();

const walletTypesTables = {
  [WALLET_STRUCTURE_TYPE.BACKUP]: MultisigRowBackupType,
  [WALLET_STRUCTURE_TYPE.CONSIGNER]: MultisigRowCoSignerType,
  [WALLET_STRUCTURE_TYPE.MULTISIG]: MultisigRowMultisigType,
};

const walletTypeTableComponent = computed(() => walletTypesTables[props.walletType]);
const walletQuorum = computed(() => WALLET_PRESET_QUORUM[props.keyVariant]);
</script>
