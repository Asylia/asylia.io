<template>
  <UInput class="w-full" :placeholder="props.placeholder" size="lg" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: 'Enter your email',
  },
);
</script>
