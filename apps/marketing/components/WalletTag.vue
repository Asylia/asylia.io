<template>
  <div
    class="rounded-full hover:cursor-pointer hover:opacity-75 mb-1 shrink-0 py-[1px] px-3 bg-slate-700 dark:bg-gray-300 text-white dark:text-slate-700 text-xs"
    @click="openOnMempool"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const walletAddress = (useRuntimeConfig().public?.NUXT_PUBLIC_WALLET_ADDRESS ?? '') as string;

const openOnMempool = () => {
  window.open(`https://mempool.space/address/${walletAddress}`, '_blank');
};
</script>
