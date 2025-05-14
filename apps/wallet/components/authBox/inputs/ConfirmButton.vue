<template>
  <UButton
    color="primary"
    variant="solid"
    size="lg"
    block
    class="flex items-center hover:cursor-pointer justify-center"
    :loading="props.loading"
    :disabled="props.disabled"
  >
    <span class="text-center">
      {{ props.title }}
    </span>
    <UIcon name="i-lucide-arrow-right" class="size-5" />
  </UButton>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  loading?: boolean;
  disabled?: boolean;
}>();
</script>
