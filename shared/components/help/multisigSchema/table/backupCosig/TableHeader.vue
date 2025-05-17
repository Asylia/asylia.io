<template>
  <div class="grid grid-cols-12">
    <div
      class="col-span-2 md:col-span-1 p-2 text-slate-500 dark:text-gray-300 rounded-l-md font-bold text-center border-r border-b border-l border-t border-gray-300 dark:border-gray-700 flex items-center justify-center"
    >
      <span class="text-gray-400">#</span>
    </div>
    <div
      class="col-span-10 md:col-span-8 p-2 rounded-r-md md:rounded-r-none font-bold text-center border-r border-b border-t border-gray-300 dark:border-gray-700 flex items-center justify-center"
    >
      <div
        class="flex flex-wrap items-center text-slate-500 dark:text-gray-300 justify-center gap-1"
      >
        <span>{{ textF('multisig_schema.header.title') }} {{ props.title }}</span> -
        <span class="text-slate-500 dark:text-gray-300">{{ variantTitle }}</span>
        <FontAwesomeIcon :icon="['fas', 'shield-keyhole']" class="text-info" />
      </div>
    </div>
    <div
      class="hidden md:flex md:col-span-2 text-slate-500 dark:text-gray-300 p-2 font-bold text-center border-r border-b border-t border-gray-300 dark:border-gray-700 items-center justify-center space-x-2"
    >
      {{ textF('multisig_schema.header.key') }}
    </div>
    <div
      class="hidden md:flex md:col-span-1 text-slate-500 dark:text-gray-300 rounded-r-md p-2 font-bold text-center border-r border-b border-t border-gray-300 dark:border-gray-700 items-center justify-center space-x-2"
    >
      {{ textF('multisig_schema.header.owner') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import { WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS } from '@shared/types/WalletStructure';
import { textF } from '@shared/composuables/language';

const props = defineProps<{
  title?: string;
  keyVariant: string;
}>();

const variantTitle = computed(() =>
  props.keyVariant === WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['3of5'] ? '3 of 5' : '2 of 3',
);
</script>
