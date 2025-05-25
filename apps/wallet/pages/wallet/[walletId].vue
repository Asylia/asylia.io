<template>
  <div class="w-screen flex items-start h-screen px-5 pt-5">
    <AppNavigation />

    <LockedWalletView v-if="selectedWalletIsLocked" />

    <template v-else>
      <div class="flex-col pl-8 w-[420px] shrink-0 grow-0">
        <WalletInfoAndBalance />
        <WalletKeys />
        <LockWalletButton />
      </div>

      <div class="flex-1"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import AppNavigation from '~/components/wallet/walletNavigation/AppNavigation.vue';
import WalletInfoAndBalance from '~/components/wallet/walletInfoAndBalance/WalletInfoAndBalance.vue';
import WalletKeys from '~/components/wallet/walletKeys/WalletKeys.vue';
import LockWalletButton from '~/components/wallet/LockWalletButton.vue';
import LockedWalletView from '~/components/wallet/LockedWalletView.vue';
import { useWalletListStore } from '~/stores/wallet/WalletListStore';
import { useWalletInstanceStore } from '~/stores/wallet/WalletIInstanceStore';

const walletListStore = useWalletListStore();
const walletInstanceStore = useWalletInstanceStore();
walletListStore.initStore();

const route = useRoute();

const selectedWalletIsLocked = computed(() => {
  return walletListStore.selectedWallet && !walletListStore.selectedWalletIsUnlocked;
});

watch(
  () => route.params.walletId,
  (walletId) => {
    walletListStore.setSelectedWalletId(walletId as string);
  },
  { immediate: true },
);


watch(
  selectedWalletIsLocked,
  (locked) => {
    console.log('Selected wallet is locked:', locked);
    console.log('walletListStore.selectedWallet.config', walletListStore.selectedWallet.config);
    if (locked) return;
    walletInstanceStore.initWallet(walletListStore.selectedWallet.config);
  },
  { immediate: true },
);
</script>
