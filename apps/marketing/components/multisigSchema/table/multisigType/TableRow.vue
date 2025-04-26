<template>
  <TableRowWrapper
    :index="props.index"
    :is-last="props.isLast"
    :schema-length="props.scheme?.length ?? 0"
  >
    <!-- Dynamic rows for users -->
    <template v-for="(value, userIndex) in props.scheme" :key="userIndex">
      <!-- User info -->
      <div
        :class="{ 'border-t': props.index === 0 && userIndex === 0 }"
        class="flex text-slate-500 dark:text-gray-300 col-span-8 row-span-1 py-2 px-2 items-center justify-center border-b border-r border-gray-300 dark:border-gray-700"
      >
        <font-awesome
          :icon="['fas', 'user']"
          class="text-sm mr-2 text-slate-500 dark:text-gray-300"
        />
        <span class="capitalize">{{ $t('multisig_schema.body.user') }} {{ userIndex + 1 }}</span>
      </div>

      <!-- Key status -->
      <KeyCheckCol
        :active="props.scheme[userIndex]"
        bb
        :bt="props.index === 0 && userIndex === 0"
      />

      <!-- Status column - only visible on the first row -->
      <div
        v-if="userIndex === 0"
        :class="{
          'border-t rounded-tr-md': props.index === 0,
          'rounded-br-md': props.isLast,
        }"
        :style="{ 'grid-row': `span ${props.scheme.length}` }"
        class="flex col-span-2 md:col-span-1 border-b border-r py-2 px-2 text-slate-500 dark:text-gray-300 items-center justify-center border-gray-300 dark:border-gray-700"
      >
        <font-awesome v-if="isActive" :icon="['fas', 'circle-check']" class="text-success" />
        <font-awesome v-else :icon="['fas', 'circle-xmark']" class="text-base text-error" />
      </div>
    </template>
  </TableRowWrapper>
</template>

<script setup lang="ts">
import TableRowWrapper from '~/components/multisigSchema/table/backupCosig/TableRowWrapper.vue';
import KeyCheckCol from '~/components/multisigSchema/table/KeyCheckCol.vue';
import { SCENARIO_ACTIVE_INACTIVE } from '~/utils/constants/ui/wallet';

const props = defineProps<{
  activeInactive: string;
  keyVariant: string;
  scheme?: number[];
  index: number;
  isLast?: boolean;
}>();

const isActive = computed(() => props.activeInactive === SCENARIO_ACTIVE_INACTIVE.ACTIVE);
</script>
