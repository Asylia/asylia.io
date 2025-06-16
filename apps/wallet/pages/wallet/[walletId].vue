<template>
  <div class="w-screen flex items-start h-screen px-5 pt-5">
    <AppNavigation />

    <template v-if="activeWalletStore.activeWalletIsEncrypted">
      <LockedWalletView />
    </template>

    <template v-else>
      <div class="flex-col pl-8 w-[420px] shrink-0 grow-0">
        <WalletInfoAndBalance />
        <WalletKeys />
        <LockWalletButton />
      </div>

      <div class="flex-1">
        <pre>
          {{ activeWalletStore.activeWallet }}
          <!--        allUsersKeysAreFullySetUp:  {{ walletInstanceStore.allUsersKeysAreFullySetUp }}-->
        </pre>

        <pre>
<!--          {{ walletInstanceStore.walletConfig }}-->
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
import { MiddlewareName } from '~/middleware/redirectToHomeIfNoWalletInLocalStorage.client';
import { useWalletStorageListStore } from '~/stores/wallet/storage/list';
import { useActiveWalletStore } from '~/stores/wallet/ActiveWalletStore';

const route = useRoute();

const walletStorageListStore = useWalletStorageListStore();
const activeWalletStore = useActiveWalletStore();
// walletStorageListStore.load();

/*
 *  - wallet
 *
 *
 *    - create
 *
 *    - use
 *      - balance
 *        - #api
 *         - providers
 *            - mempool
 *                MempoolProvider.ts
 *                ....
 *            - blockstream
 *                BlockstreamProvide.ts
 *                ...
 *          Address.ts
 *          Transactions.ts
 *      - addressType
 *        - p2sh-p2wsh
 *        - taproot
 */

const selectedWalletId = computed<string>(() => {
  return (route.params.walletId ?? '').toString();
});

/*
 * On route change, set the active wallet id
 */
watch(
  selectedWalletId,
  (walletId) => {
    activeWalletStore.setActiveWallet(walletId);
  },
  { immediate: true },
);

definePageMeta({
  middleware: [MiddlewareName],
});
</script>
