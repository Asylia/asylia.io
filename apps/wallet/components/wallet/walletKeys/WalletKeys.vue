<template>
  <div class="mt-5 bg-dark-secondary rounded-md">
    <div class="flex items-center justify-between py-3 px-8">
      <div class="font-roboto-mono text-lg font-semibold text-gray-200">Wallet Keys</div>
      <FontAwesomeIcon :icon="['fal', 'key']" class="text-lg text-primary" />
    </div>
    <hr class="border-t border-white/5" />

    <SingleWalletKey
      v-for="(extendedPubKey, i) in walletKeysList"
      :extendedPubKey="extendedPubKey"
      :key="i"
      :index="i"
      :divider="i < walletKeysList.length - 1"
    />

  </div>
</template>
<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import SingleWalletKey from './SingleWalletKey.vue';
import { useWalletInstanceStore } from '~/stores/wallet/WalletIInstanceStore';

const walletInstance = useWalletInstanceStore();
const walletKeysList = computed(() => walletInstance.walletKeysList ?? []);
</script>
