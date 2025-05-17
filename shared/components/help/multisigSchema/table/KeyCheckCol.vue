<template>
  <div
    :class="{
      'border-b': props.bb,
      'border-t': props.bt,
    }"
    class="hidden text-slate-500 dark:text-gray-300 md:flex md:col-span-2 py-2 px-2 text-center border-r border-gray-300 dark:border-gray-700 text-base items-center justify-center space-x-4"
  >
    <FontAwesomeIcon :icon="['fas', 'key']" class="text-base text-primary" />
    <FontAwesomeIcon v-if="props.active" :icon="['fas', 'check']" class="text-base text-success" />
    <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-base text-error" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';

const props = defineProps<{
  active: number | boolean | undefined;
  bb?: boolean;
  bt?: boolean;
  class?: string | string[] | object;
}>();
</script>
