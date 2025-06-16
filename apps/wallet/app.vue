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
import { useWalletStorageListStore } from '~/stores/wallet/storage/list';

const walletStorageListStore = useWalletStorageListStore()
if (import.meta.client) {
  console.log('aap vue')

  walletStorageListStore.load()
}
</script>
