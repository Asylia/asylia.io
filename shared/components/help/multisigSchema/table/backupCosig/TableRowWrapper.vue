<template>
  <div
    class="grid grid-cols-12 md:auto-rows-fr"
    :class="{
      'mt-5': props.index === 0,
      'bg-slate-850': isOdd && isDark,
      'bg-light-850': isOdd && !isDark,
      'dark:bg-slate-900': !isOdd && isDark,
    }"
  >
    <!-- Scenario Number - Always visible -->
    <div
      :class="{
        'row-span-1': props.schemaLength === 1,
        'row-span-2': props.schemaLength === 2,
        'row-span-3': is2of3 || props.schemaLength === 3,
        'row-span-4': props.schemaLength === 4,
        'row-span-5': is3of5 || props.schemaLength === 5,
        'row-span-6': props.schemaLength === 6,
        'row-span-7': props.schemaLength === 7,
        'rounded-tl-md border-t': props.index === 0,
        'rounded-bl-md': props.isLast,
      }"
      class="col-span-2 text-slate-500 dark:text-gray-300 md:col-span-1 py-2 px-2 flex flex-col items-center justify-center font-medium border-r border-l border-b border-gray-300 dark:border-gray-700"
    >
      <div class="text-xl">
        {{ props.index + 1 }}
      </div>
      <div class="text-gray-400 mt-1 text-xs md:text-sm">
        {{ textF('multisig_schema.body.scenario') }}
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import appColorMode from '@shared/composuables/ui/colorMode';
import { textF } from '@shared/composuables/language';

const props = defineProps<{
  index: number;
  isLast: boolean;
  is2of3?: boolean;
  is3of5?: boolean;
  schemaLength?: number;
}>();

const { isDark } = appColorMode();

const isOdd = computed(() => props.index % 2 !== 0);
</script>
