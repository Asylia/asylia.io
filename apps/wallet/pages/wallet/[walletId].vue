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

      <div class="flex-1">
        <pre>
        allUsersKeysAreFullySetUp:  {{ walletInstanceStore.allUsersKeysAreFullySetUp }}
        </pre>
        <pre>
          {{ walletInstanceStore.walletConfig }}
        </pre>
      </div>
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
import { MiddlewareName } from '~/middleware/redirectToHomeIfNoWalletInLocalStorage.client';

const route = useRoute();
const walletListStore = useWalletListStore();
const walletInstanceStore = useWalletInstanceStore();
walletListStore.initStore();

const selectedWalletId = computed<string>(() => {
  return (route.params.walletId ?? '').toString();
});
const selectedWalletIsLocked = computed<boolean>((): boolean => {
  return !!(walletListStore?.selectedWallet && !walletListStore?.selectedWalletIsUnlocked);
});

watch(
  selectedWalletId,
  (walletId, o) => {
    walletListStore.setSelectedWalletId(walletId as string);
  },
  { immediate: true },
);

watch(
  selectedWalletIsLocked,
  () => {
    // if (locked) return;
    // if (selectedWalletIsLocked.value) return;
    if (!walletListStore.selectedWallet?.isDecrypted) return;

    walletInstanceStore.initWallet(
      walletListStore.selectedWallet.config,
      walletListStore.selectedWallet.version,
    );
  },
  { immediate: true },
);

definePageMeta({
  middleware: [MiddlewareName],
});
</script>
