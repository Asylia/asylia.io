<template>
  <UTabs v-model="walletType" :items="walletTypeOptions" />
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { WALLET_STRUCTURE_TYPE, type WalletStructureType } from '@shared/types/WalletStructure';
import { textF } from '@shared/composuables/language';

const walletType = defineModel<WalletStructureType>();

const walletTypeOptions = ref<TabsItem[]>([
  {
    value: WALLET_STRUCTURE_TYPE.BACKUP,
    label: textF('multisig_schema.filter.p1', 'Backup'),
    icon: 'ic:outline-shield',
  },
  {
    value: WALLET_STRUCTURE_TYPE.CONSIGNER,
    label: textF('multisig_schema.filter.p1', 'Co-sig'),
    icon: 'fluent:person-passkey-16-regular',
  },
  {
    value: WALLET_STRUCTURE_TYPE.MULTISIG,
    label: textF('multisig_schema.filter.p1', 'Multisig'),
    icon: 'bitcoin-icons:two-keys-outline',
  },
]);
</script>
