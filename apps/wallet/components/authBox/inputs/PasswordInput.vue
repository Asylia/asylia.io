<template>
  <UInput
    v-model="value"
    class="w-full"
    trailing-icon="material-symbols:visibility-rounded"
    :placeholder="props.placeholder"
    :type="showPassword ? 'text' : 'password'"
    size="lg"
    :ui="{ trailing: 'pe-1' }"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        :aria-pressed="showPassword"
        aria-controls="password"
        @click="showPassword = !showPassword"
      />
    </template>
  </UInput>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: 'Enter your password',
  },
);

const value = defineModel<string>();

const showPassword = ref<boolean>(false);
</script>
