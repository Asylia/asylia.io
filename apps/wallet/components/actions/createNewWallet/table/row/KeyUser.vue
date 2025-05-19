<template>
  <div class="w-full flex">
    <div
      class="px-4 flex-1 w-full py-2 border-t border-r border-white/10">
      <div class="flex items-center space-x-2 grow">
        <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary text-base" />
        <div class="">
          <span class="font-semibold">
            <template v-if="props.isBackup">Your </template>Sign Key
          </span>
          <span class="font-light">{{ props.index + 1 }}</span>
        </div>
      </div>
      <div class="pl-6 pr-2 text-xs text-left text-secondary-400">
        One of the following devices is one of your sign keys.
      </div>
    </div>
    <div
      class="flex flex-col flex-1 border-t border-r border-white/10 justify-center items-center px-2 py-2"
      :class="{
        'rounded-tr-md': props.index === 0,
      }"
    >
      <div class="flex justify-center items-center space-x-4">
        <SignDevice v-model="value" :type="SIGN_DEVICES_LIST.TREZOR" />
        <SignDevice v-model="value" :type="SIGN_DEVICES_LIST.LEDGER" />
        <SignDevice v-model="value" :type="SIGN_DEVICES_LIST.MOBILE_APP" :coming-soon="true" />
      </div>
    </div>
    <div class="flex flex-col w-[120px] justify-center items-center px-1 py-2 shrink-0">
      <div v-if="!hasPickedKey" class="flex items-center space-x-2">
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" class="text-warning" />
        <span class="text-xs text-warning font-semibold">Pick key</span>
      </div>
      <div v-else class="text-xs w-full text-center px-1 text-primary font-semibold">
        {{ value }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import SignDevice from '~/components/actions/createNewWallet/table/row/SignDevice.vue';
import { SIGN_DEVICES_LIST } from '@shared/types/SignDevices';
import type { SignDevicesListType } from '@shared/types/SignDevices';

const props = defineProps<{
  index: number;
  isBackup: boolean;
}>();

const value = ref<SignDevicesListType | null>(null);

const hasPickedKey = computed(() => value.value !== null);
</script>
