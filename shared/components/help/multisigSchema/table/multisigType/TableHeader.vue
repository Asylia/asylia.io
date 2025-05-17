<template>
  <div class="grid grid-cols-12">
    <div
      class="col-span-2 md:col-span-1 p-2 rounded-l-md font-bold text-center border-r border-b border-l border-t border-gray-300 dark:border-gray-700 flex items-center justify-center"
    >
      <span class="text-slate-500 dark:text-gray-300">#</span>
    </div>
    <div
      class="col-span-10 text-slate-500 dark:text-gray-300 md:col-span-8 p-2 font-bold rounded-r-md md:rounded-r-none text-center border-r border-b border-t border-gray-300 dark:border-gray-700 flex items-center justify-center"
    >
      <div class="flex flex-wrap items-center justify-center gap-1">
        {{ textF('multisig_schema.header.title') }}
        <font-awesome :icon="['fas', 'shield-keyhole']" class="text-info" />
      </div>
    </div>
    <div
      class="hidden md:flex md:col-span-2 p-2 text-slate-500 dark:text-gray-300 font-bold text-center border-r border-b border-t border-gray-300 dark:border-gray-700 items-center justify-center space-x-2"
    >
      {{ textF('multisig_schema.header.key') }}
    </div>
    <div
      class="hidden md:flex md:col-span-1 text-slate-500 dark:text-gray-300 rounded-r-md p-2 font-bold text-center border-b border-t border-r border-gray-300 dark:border-gray-700 items-center justify-center"
    >
      <span>{{ textF('multisig_schema.header.operational') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { textF } from '@shared/composuables/language';

</script>
