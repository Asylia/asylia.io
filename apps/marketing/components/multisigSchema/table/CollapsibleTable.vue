<template>
  <div class="w-full">
    <!-- Show first 4 rows or all if expanded -->
    <component
      :is="props.tableRowComponent"
      v-for="(row, i) in visibleRows"
      :key="i"
      :index="i"
      :is-last="i === visibleRows.length - 1 && (!hasMoreRows || isExpanded)"
      :scheme="row.keys"
      :key-variant="props.keyVariant"
      :active-inactive="props.activeInactive"
    />

    <!-- Show more button if there are more rows -->
    <template v-if="hasMoreRows">
      <div
        v-if="!isExpanded"
        class="flex flex-col items-center justify-center text-gray-200 mt-5 hover:cursor-pointer hover:opacity-70"
        @click="toggleExpand"
      >
        <span class>{{ $t('multisig_schema.show_more') }} {{ remainingRowsCount }}</span>
        <font-awesome :icon="['fas', 'angle-down']" class="mt-1" />
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center text-gray-200 mt-5 hover:cursor-pointer hover:opacity-70"
        @click="toggleExpand"
      >
        <font-awesome :icon="['fas', 'angle-up']" class="" />
        <span class="mt-1">{{ $t('multisig_schema.hide') }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Quorum } from '~/utils/constants/ui/wallet';

const props = defineProps<{
  activeInactive: string;
  keyVariant: string;
  quorum: Quorum;
  tableRows: unknown[];
  tableRowComponent: Component;
}>();

const MAX_VISIBLE_ROWS = 4;
const isExpanded = ref(false);

const tableRows = computed(() => props.tableRows);

const visibleRows = computed(() => {
  if (isExpanded.value || tableRows.value.length <= MAX_VISIBLE_ROWS) {
    return tableRows.value;
  }
  return tableRows.value.slice(0, MAX_VISIBLE_ROWS);
});

const hasMoreRows = computed(() => {
  return tableRows.value.length > MAX_VISIBLE_ROWS;
});

const remainingRowsCount = computed(() => {
  return tableRows.value.length - MAX_VISIBLE_ROWS;
});

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) {
    nextTick(() => {
      const element = document.getElementById('multisig-table');
      if (!element) return;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
</script>
