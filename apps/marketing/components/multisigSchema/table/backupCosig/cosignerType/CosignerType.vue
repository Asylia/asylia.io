<template>
  <div class="w-full">
    <TableHeader title="Co-sig" :key-variant="props.keyVariant" />

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
import TableHeader from '~/components/multisigSchema/table/backupCosig/TableHeader.vue';
import TableRow from '~/components/multisigSchema/table/backupCosig/cosignerType/TableRow.vue';
import CollapsibleTable from '~/components/multisigSchema/table/CollapsibleTable.vue';
import { generateTableRows } from '~/components/multisigSchema/composuables';
import type { Quorum } from '~/utils/constants/ui/wallet';

const props = defineProps<{
  activeInactive: string;
  keyVariant: string;
  quorum: Quorum;
  scheme?: number[];
}>();

const tableRows = computed(() =>
  generateTableRows(props.quorum.m, props.quorum.n, props.activeInactive),
);
</script>
