<template>
  <UApp class="bg-[#141e36]">
    <CursorGlow />
    <client-only>
      <NuxtPage />
    </client-only>
  </UApp>
</template>

<script setup lang="ts">
import CursorGlow from '@shared/components/ui/CursorGlow.vue';
</script>
