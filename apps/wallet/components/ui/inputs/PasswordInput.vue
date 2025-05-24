<template>
  <div class="wf-ull">
    <UInput
      v-model="value"
      placeholder="Password"
      :type="show ? 'text' : 'password'"
      :ui="{ trailing: 'pe-1' }"
      class="w-full"
    >
      <template #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="show ? 'Hide password' : 'Show password'"
          :aria-pressed="show"
          aria-controls="password"
          @click="show = !show"
        />
      </template>
    </UInput>
  </div>
</template>

<script setup lang="ts">
const value = defineModel<string>();
const show = defineModel<boolean>('show');
</script>
