<template>
  <div class="w-full">
    <TableHeader :title="$t('multisig_schema.backup')" :key-variant="props.keyVariant" />
    <CollapsibleTable
      :table-row-component="TableRow"
      :table-rows="tableRows"
      :key-variant="props.keyVariant"
      :quorum="props.quorum"
      :active-inactive="props.activeInactive"
    />
  </div>
</template>

<script setup lang="ts">
import TableHeader from '@shared/components/help/multisigSchema/table/backupCosig/TableHeader.vue';
import TableRow from '@shared/components/help/multisigSchema/table/backupCosig/backupType/TableRow.vue';
import CollapsibleTable from '@shared/components/help/multisigSchema/table/CollapsibleTable.vue';
import { generateTableRows } from '@shared/components/help/multisigSchema/composuables';
import type { Quorum } from '@shared/types/WalletStructure';

const props = defineProps<{
  activeInactive: string;
  keyVariant: string;
  quorum: Quorum;
}>();

const tableRows = computed(() =>
  generateTableRows(props.quorum.m, props.quorum.n, props.activeInactive),
);
</script>
