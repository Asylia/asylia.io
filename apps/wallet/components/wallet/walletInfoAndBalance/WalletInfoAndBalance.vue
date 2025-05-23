<template>
  <div class="bg-dark-secondary w-full rounded-md">
    <WalletInfo />
    <WalletBalance />
  </div>
</template>
<script setup lang="ts">
import BitcoinIcon from '@shared/images/icons/BitcoinIcon.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import WalletInfo from './walletInfo/WalletInfo.vue';
import WalletBalance from './walletBalance/WalletBalance.vue';
</script>
