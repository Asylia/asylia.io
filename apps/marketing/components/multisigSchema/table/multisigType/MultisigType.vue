<template>
  <div class="w-full">
    <TableHeader title="Co-sig" :key-variant="props.keyVariant" />

    <CollapsibleTable
      :active-inactive="props.activeInactive"
      :key-variant="props.keyVariant"
      :quorum="props.quorum"
      :custom-schema="props.customSchema"
      :table-rows="tableRows"
      :table-row-component="TableRow"
    />
  </div>
</template>

<script setup lang="ts">
import TableHeader from '~/components/multisigSchema/table/multisigType/TableHeader.vue';
import TableRow from '~/components/multisigSchema/table/multisigType/TableRow.vue';
import CollapsibleTable from '~/components/multisigSchema/table/CollapsibleTable.vue';
import { generateTableRows } from '~/components/multisigSchema/composuables';
import type { Quorum } from '~/utils/constants/ui/wallet';

const props = defineProps<{
  activeInactive: string;
  keyVariant: string;
  quorum: Quorum;
  customSchema?: {
    enabled: boolean;
    m: number;
    n: number;
  };
}>();

const customSchemeEnabled = computed(() => props.customSchema?.enabled);

const tableRows = computed(() => {
  if (customSchemeEnabled.value)
    return generateTableRows(props.customSchema.m, props.customSchema.n, props.activeInactive);
  return generateTableRows(props.quorum.m, props.quorum.n, props.activeInactive);
});
</script>
