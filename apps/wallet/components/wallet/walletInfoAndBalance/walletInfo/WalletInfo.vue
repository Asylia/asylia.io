<template>
  <div class="w-full">
    <div class="flex items-center justify-between px-7 pt-2 pb-2">
      <div class="flex items-center space-x-4">
        <BitcoinIcon class="h-5 w-auto" />
        <div class="text-btc font-roboto-mono text-2xl font-semibold">
          {{ walletName}}
        </div>
      </div>
      <FontAwesomeIcon :icon="['fal', 'wallet']" class="text-2xl shrink-0 text-primary" />
    </div>

    <hr class="border-t border-white/10" />

    <div class="flex items-center w-full">
      <div class="flex items-center justify-center space-x-2 flex-1 py-2 px-2">
        <UIcon name="ic:outline-shield" class="size-4 text-primary" />
        <span class="font-roboto-mono text-sm text-gray-300">Backup</span>
      </div>

      <div
        class="text-base font-roboto-mono flex items-center py-2 px-2 justify-center space-x-2 flex-1 border-x border-white/10"
      >
        <FontAwesomeIcon
          :icon="['fal', 'key-skeleton-left-right']"
          class="text-info shrink-0 text-sm w-auto"
        />
        <span class="text-sm text-gray-300">2of3</span>
      </div>

      <div class="text-base flex items-center justify-center py-2 px-2 space-x-2 flex-1">
        <FontAwesomeIcon :icon="['fal', 'sliders']" class="text-warning text-sm" />
        <span class="font-roboto-mono text-sm text-gray-300">P2WSH</span>
      </div>
    </div>

    <hr class="border-t border-white/10" />
  </div>
</template>
<script setup lang="ts">
import BitcoinIcon from '@shared/images/icons/BitcoinIcon.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import { useWalletInstanceStore } from '~/stores/wallet/WalletIInstanceStore';

const walletInstance = useWalletInstanceStore();
const walletName = computed(()=>walletInstance.walletConfig?.name ?? 'Unnamed Wallet');
</script>
