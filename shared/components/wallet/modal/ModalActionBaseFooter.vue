<template>
  <div class="flex w-full justify-between">
    <div class="flex space-x-2">
      <UButton
        label="Help"
        size="md"
        color="neutral"
        variant="subtle"
        trailing-icon="material-symbols:info"
        @click="emit('help')"
      />
    </div>
    <div class="flex space-x-2">
      <UButton label="Cancel" size="md" color="neutral" variant="outline" @click="emit('cancel')" />
      <UButton
        @click="emit('action')"
        :label="props.actionText"
        size="md"
        color="primary"
        trailing-icon="material-symbols:arrow-right-alt"
        class="hover:cursor-pointer"
        :disabled="props.actionDisabled"
        :loading="props.actionLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    actionText?: string;
    actionDisabled?: boolean;
    actionLoading?: boolean;
  }>(),
  {
    actionText: 'Create',
    actionDisabled: false,
    actionLoading: false,
  },
);

const emit = defineEmits(['action', 'cancel', 'help']);
</script>
