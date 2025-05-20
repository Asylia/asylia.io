<template>
  <UTabs v-model="walletType" :items="walletTypeOptions" />
</template>

<script setup lang="ts">
import { textF } from '@shared/composuables/language';
import { WALLET_STRUCTURE_TYPE } from '@shared/types/Wallet';
import type { TabsItem } from '@nuxt/ui';
import type { WalletStructureType } from '@shared/types/Wallet';

const walletType = defineModel<WalletStructureType>();

const walletTypeOptions = ref<TabsItem[]>([
  {
    value: WALLET_STRUCTURE_TYPE.BACKUP,
    label: textF('multisig_schema.filter.p1', 'Backup'),
    icon: 'ic:outline-shield',
  },
  {
    value: WALLET_STRUCTURE_TYPE.CONSIGNER,
    label: textF('multisig_schema.filter.p2', 'Co-sig'),
    icon: 'fluent:person-passkey-16-regular',
  },
  {
    value: WALLET_STRUCTURE_TYPE.MULTISIG,
    label: textF('multisig_schema.filter.p3', 'Multisig'),
    icon: 'bitcoin-icons:two-keys-outline',
  },
]);
</script>
