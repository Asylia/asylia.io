<template>
  <div v-motion-slide-bottom class="flex justify-center">
    <div class="bg-slate-800 border-l-4 border-yellow-600 p-6 mx-auto  rounded-md shadow-md  flex flex-col space-y-4">

      <div class="text-gray-100 text-center md:text-left dark:text-gray-300 text-lg font-semibold">
        {{ $t('support.title') }}
      </div>

      <div class="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0">
        <div class="flex flex-col">

          <div class="md:flex md:space-x-4 items-center">
            <div class="bg-slate-700 px-4 py-2 rounded-md text-sm font-mono text-yellow-400 break-all">
              {{ BTC_ADDRESS }}
            </div>
            <UButton class="hover:cursor-pointer mt-5 md:mt-0 w-full md:w-auto text-center"
                     @click="copyAddress" size="sm" block color="primary" variant="solid"
                     :label="$t('copy_address')"
                     icon="material-symbols:content-copy"
            />
          </div>

          <div class="flex mt-5 md:mt-3 items-center flex-wrap font-semibold  space-x-2">
            <div class="rounded-full mb-1 shrink-0 py-[1px] px-2 dark:bg-gray-300 dark:text-slate-700 text-xs">
              Multisig
            </div>
            <div class="rounded-full mb-1 shrink-0 py-[1px] px-2 dark:bg-gray-300 dark:text-slate-700 text-xs">
              P2SH-P2WSH
            </div>
            <div class="rounded-full mb-1 shrink-0 py-[1px] px-2 dark:bg-gray-300 dark:text-slate-700 text-xs">
              2-of-3
            </div>
            <div class="rounded-full mb-1 shrink-0 py-[1px] px-2 dark:bg-gray-300 dark:text-slate-700 text-xs">
              Asylia wallet
            </div>
          </div>
        </div>

      </div>

      <div class="text-gray-100 dark:text-gray-400 text-center md:text-left text-sm">
        {{ $t('support.current_balance') }}: <span class="text-yellow-400 font-semibold">{{ balanceBTC }} BTC</span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useIntervalFn, useStorage, type UseIntervalReturn} from '@vueuse/core'

/**
 * Refresh interval in milliseconds (60 seconds).
 */
const REFRESH_INTERVAL: number = 120_000

/**
 * LocalStorage key for storing the timestamp of the last successful fetch.
 */
const BTC_REFRESH_LS_KEY: string = 'btc-refresh-ls-key'

/**
 * Bitcoin address from which to fetch the balance.
 */
const BTC_ADDRESS: string = '3AhRa1ceKx4mMzWVoRVMQfaXZEcGRj5qcu'

/**
 * Toast notification service.
 */
const toast = useToast()

/**
 * Internationalization function.
 */
const {t} = useI18n()

/**
 * Reactive state for displaying the BTC balance as a formatted string.
 */
const balanceBTC = useStorage<string | number>('btc-balance', '-')

/**
 * Reactive timestamp of the last balance fetch.
 * Initializes from localStorage or zero if not present.
 */
const lastFetch: Ref<number> = ref(Number(localStorage.getItem(BTC_REFRESH_LS_KEY) || 0))

/**
 * Interface representing the shape of the response
 * from blockchain.info/rawaddr.
 */
interface RawAddressResponse {
  final_balance: number
}

/**
 * Fetches the BTC balance from the API, updates reactive state,
 * and persists the fetch timestamp to localStorage.
 */
const fetchBalance = async (): Promise<void> => {
  try {
    const response = await fetch(
        `https://blockchain.info/rawaddr/${BTC_ADDRESS}`
    )
    const data: RawAddressResponse = await response.json()
    const satoshis: number = data.final_balance ?? 0

    // Show a dash if zero, otherwise convert satoshis to BTC
    balanceBTC.value =
        satoshis === 0 ? '-' : (satoshis / 1e8).toFixed(8)

    // Update timestamp and persist it
    lastFetch.value = Date.now()
    localStorage.setItem(BTC_REFRESH_LS_KEY, lastFetch.value.toString())
  } catch (error) {
    console.error('BTC fetch error:', error)
  }
}

/**
 * Sets up an interval that, every REFRESH_INTERVAL ms,
 * checks whether enough time has passed to fetch again.
 */
const {pause, resume}: UseIntervalReturn = useIntervalFn(
    () => {
      if (Date.now() - lastFetch.value >= REFRESH_INTERVAL) {
        fetchBalance()
      }
    },
    REFRESH_INTERVAL,
    {immediate: false}
)

/**
 * Lifecycle hook: on component mount,
 * - If REFRESH_INTERVAL has passed since last fetch, fetch immediately.
 * - Otherwise, start the interval which will handle the delayed fetch.
 */
onMounted(() => {
  const now: number = Date.now()
  const elapsed: number = now - lastFetch.value

  if (elapsed >= REFRESH_INTERVAL) {
    fetchBalance()
  }

  // Start the interval (first callback will occur after REFRESH_INTERVAL)
  resume()
})

/**
 * Copies the BTC address to the clipboard and shows a toast notification.
 */
const copyAddress = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(BTC_ADDRESS)
    toast.add({
      description: t('support.success'),
      color: 'success',
    })
  } catch {
    toast.add({
      description: t('support.error'),
      color: 'error',
    })
  }
}
</script>

