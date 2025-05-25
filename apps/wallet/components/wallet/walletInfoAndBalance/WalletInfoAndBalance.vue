<template>
  <div class="bg-dark-secondary w-full rounded-md">
    <WalletInfo />
    <WalletBalance />
  </div>
</template>
<script setup lang="ts">
import WalletInfo from './walletInfo/WalletInfo.vue';
import WalletBalance from './walletBalance/WalletBalance.vue';
</script>
