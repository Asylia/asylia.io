<template>
  <div class="w-screen flex items-start h-screen px-5 pt-5">
    <AppNavigation />

    <div class="flex-col pl-8 w-[420px] shrink-0 grow-0">
      <WalletInfoAndBalance />
      <WalletKeys />
    </div>

    <div class="flex-1"></div>
  </div>
</template>

<script setup lang="ts">
import AppNavigation from '~/components/wallet/walletNavigation/AppNavigation.vue';
import WalletInfoAndBalance from '~/components/wallet/walletInfoAndBalance/WalletInfoAndBalance.vue';
import WalletKeys from '~/components/wallet/walletKeys/WalletKeys.vue';
</script>
