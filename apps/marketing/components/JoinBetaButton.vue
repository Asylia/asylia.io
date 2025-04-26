<template>
  <UButton
    :variant="isDark ? 'outline' : 'solid'"
    icon="material-symbols:notifications"
    trailing-icon="i-material-symbols:keyboard-double-arrow-down-rounded"
    size="xl"
    class="!rounded-sm hover:cursor-pointer"
    @click="scrollToSupport"
  >
    {{ $t('join_beta_button') }}
  </UButton>
</template>

<script setup lang="ts">
import appColorMode from '@shared/composuables/ui/colorMode';

const { isDark } = appColorMode();

const scrollToSupport = () => {
  const supportSection = document.getElementById('support');
  if (supportSection) supportSection.scrollIntoView({ behavior: 'smooth' });
};
</script>
