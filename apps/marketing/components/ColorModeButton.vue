<template>
  <UButton
    v-if="!colorMode.forced"
    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
    color="neutral"
    variant="ghost"
    @click="toggleDark"
  />
</template>

<script setup lang="ts">
import appColorMode from '@shared/composuables/ui/colorMode';

const { colorMode, toggleDark, isDark } = appColorMode();
</script>
