<template>
  <div class="w-full flex">
    <div
      class="px-4 flex-1 w-full py-2 border-t border-r border-white/10"
      :class="{
        'border-l': props.borderL,
        'border-b': props.borderB,
        'rounded-tl-md': props.rounTl,
        'rounded-bl-md': props.isLast,
      }"
    >
      <div class="flex items-center space-x-2 grow">
        <FontAwesomeIcon
          :icon="['fas', 'key']"
          class="text-base"
          :class="props.isBackupKey ? 'text-info' : 'text-primary'"
        />
        <div class="">
          <span class="font-semibold">
            <template v-if="props.isBackupWalletType">Your </template>Sign Key
          </span>
          <span class="font-light">{{ props.index + 1 }}</span>
        </div>
      </div>
      <div class="pl-6 pr-2 text-xs text-left text-secondary-400">
        One of the following devices is one of your sign keys.
      </div>
    </div>
    <div
      class="flex flex-1 border-t border-r border-white/10 justify-center px-2 items-stretch"
      :class="{
        'rounded-tr-md': props.index === 0,
        'rounded-br-md': props.isLast,
        'border-b': props.borderB,
      }"
    >
      <SignDevice v-model="value" :type="SIGN_DEVICES_LIST.TREZOR" />
      <SignDevice v-model="value" :type="SIGN_DEVICES_LIST.LEDGER" class="border-x" />
      <SignDevice v-model="value" :type="SIGN_DEVICES_LIST.MOBILE_APP" :coming-soon="true" />
    </div>
    <div class="flex flex-col w-[120px] justify-center items-center px-1 py-2 shrink-0">
      <div v-if="!hasPickedKey" class="flex items-center space-x-2">
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" class="text-warning" />
        <span class="text-xs text-warning font-semibold">Pick key</span>
      </div>
      <div v-else class="text-xs w-full text-center px-1 text-success font-semibold">
        {{ value?.method }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import SignDevice from '~/components/actions/createNewWallet/table/row/SignDevice.vue';
import { SIGN_DEVICES_LIST } from '@shared/types/SignKeys';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';

const props = withDefaults(
  defineProps<{
    index: number;
    isBackupWalletType: boolean;
    borderL?: boolean;
    borderB?: boolean;
    isLast?: boolean;
    isBackupKey?: boolean;
    rounTl?: boolean;
  }>(),
  {
    borderL: false,
    borderB: false,
    isLast: false,
    isBackupKey: false,
    rounTl: false,
  },
);

const value = defineModel<WalletExtendedPublicKey>();
const hasPickedKey = computed(() => {
  const method = value.value?.method;
  return method !== null && method !== undefined;
});
</script>
