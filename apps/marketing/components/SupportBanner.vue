<template>
  <div class="relative py-8">
    <div class="text-slate-800 dark:text-gray-300 text-2xl font-bold text-center md:text-left">
      {{ $t('support.title') }}
    </div>

    <div class="flex flex-col mt-8 md:mt-0">
      <div
        class="flex flex-col md:flex-row items-center justify-center md:justify-start md:space-x-4 mt-2 md:mt-8"
      >
        <div
          class="bg-gray-100 border border-slate-500 dark:bg-slate-800 w-full md:max-w-[400px] shrink-0 space-x-1 md:space-x-2 px-2 md:px-4 h-[42px] flex items-center justify-center md:justify-start rounded-md text-sm font-mono text-slate-700 dark:text-primary break-all"
        >
          <FontAwesomeIcon :icon="['fab', 'bitcoin']" class="text-sm md:text-xl text-btc" />
          <span ref="addressEl" class="text-xs sm:text-base" @click="selectAddress">{{
            BTC_ADDRESS
          }}</span>
        </div>
        <UButton
          color="primary"
          variant="solid"
          :label="$t('copy_address')"
          trailing-icon="material-symbols:content-copy"
          class="rounded-lg hover:cursor-pointer mt-8 md:mt-0"
          size="md"
          @click="copyAddress"
        />
      </div>

      <div
        class="flex order-first md:order-last mt:0 md:mt-5 items-center justify-center md:justify-start flex-wrap font-semibold space-x-2"
      >
        <WalletTag> Multisig</WalletTag>
        <WalletTag> P2SH-P2WSH</WalletTag>
        <WalletTag> 2-of-3</WalletTag>
        <WalletTag> Asylia wallet</WalletTag>
      </div>
    </div>

    <div
      class="text-slate-700 dark:text-gray-200 mt-5 text-center md:text-left flex items-center justify-center md:justify-start space-x-2 text-lg"
    >
      <UIcon name="bxs:donate-heart" class="text-primary" />
      <span class="font-semibold">{{ $t('support.current_balance') }}:</span>
      <b class="text-primary font-semibold">{{ balanceBTC }} BTC</b>
    </div>
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import WalletTag from '~/components/WalletTag.vue';

import { useIntervalFn, useStorage, type UseIntervalReturn } from '@vueuse/core';

/**
 * Refresh interval in milliseconds (60 seconds).
 */
const REFRESH_INTERVAL: number = 120_000;

/**
 * LocalStorage key for storing the timestamp of the last successful fetch.
 */
const BTC_REFRESH_LS_KEY: string = 'btc-refresh-ls-key';

/**
 * Bitcoin address from which to fetch the balance.
 */
const BTC_ADDRESS: string = (useRuntimeConfig().public?.NUXT_PUBLIC_WALLET_ADDRESS ?? '') as string;

/**
 * Toast notification service.
 */
const toast = useToast();

/**
 * Internationalization function.
 */
const { t } = useI18n();

/**
 * Reactive state for displaying the BTC balance as a formatted string.
 */
const balanceBTC = useStorage<string | number>('btc-balance', '-');

/**
 * Reactive timestamp of the last balance fetch.
 * Initializes from localStorage or zero if not present.
 */
const lastFetch: Ref<number> = ref(Number(localStorage.getItem(BTC_REFRESH_LS_KEY) || 0));

/**
 * Interface representing the shape of the response
 * from blockchain.info/rawaddr.
 */
interface RawAddressResponse {
  final_balance: number;
}

/**
 * Fetches the BTC balance from the API, updates reactive state,
 * and persists the fetch timestamp to localStorage.
 */
const fetchBalance = async (): Promise<void> => {
  try {
    const response = await fetch(`https://blockchain.info/rawaddr/${BTC_ADDRESS}`);
    const data: RawAddressResponse = await response.json();
    const satoshis: number = data.final_balance ?? 0;

    // Show a dash if zero, otherwise convert satoshis to BTC
    balanceBTC.value = satoshis === 0 ? '-' : (satoshis / 1e8).toFixed(8);

    // Update timestamp and persist it
    lastFetch.value = Date.now();
    localStorage.setItem(BTC_REFRESH_LS_KEY, lastFetch.value.toString());
  } catch (error) {
    console.error('BTC fetch error:', error);
  }
};

/**
 * Sets up an interval that, every REFRESH_INTERVAL ms,
 * checks whether enough time has passed to fetch again.
 */
const { resume }: UseIntervalReturn = useIntervalFn(
  () => {
    if (Date.now() - lastFetch.value >= REFRESH_INTERVAL) {
      fetchBalance();
    }
  },
  REFRESH_INTERVAL,
  { immediate: false },
);

/**
 * Lifecycle hook: on component mount,
 * - If REFRESH_INTERVAL has passed since last fetch, fetch immediately.
 * - Otherwise, start the interval which will handle the delayed fetch.
 */
onMounted(() => {
  const now: number = Date.now();
  const elapsed: number = now - lastFetch.value;

  if (elapsed >= REFRESH_INTERVAL) {
    fetchBalance();
  }

  // Start the interval (first callback will occur after REFRESH_INTERVAL)
  resume();
});

/**
 * Copies the BTC address to the clipboard and shows a toast notification.
 */
const copyAddress = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(BTC_ADDRESS);
    toast.add({
      description: t('support.success'),
      color: 'success',
    });
  } catch {
    toast.add({
      description: t('support.error'),
      color: 'error',
    });
  }
};

/**
 * Address element for copying.
 */

const addressEl = useTemplateRef<HTMLElement | null>('addressEl');
/**
 * Selects the BTC address text for copying.
 * Uses a range to select the text node within the element.
 */
const selectAddress = () => {
  if (!addressEl.value) return;
  const range = document.createRange();
  range.selectNode(addressEl.value);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};
</script>
