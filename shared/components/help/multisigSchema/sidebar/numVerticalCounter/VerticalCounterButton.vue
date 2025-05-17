<template>
  <div
    class="w-[18px] h-[18px] rounded-full select-none bg-gray-400 dark:bg-gray-800 flex items-center justify-center"
    :class="{
      'hover:cursor-pointer hover:opacity-60': !props.disabled,
      'opacity-25': props.disabled,
    }"
  >
    <font-awesome :icon="props.icon" class="text-xs text-gray-200" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string[];
  disabled?: boolean;
}>();
</script>
