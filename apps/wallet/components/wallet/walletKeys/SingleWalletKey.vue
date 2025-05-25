<template>
  <div class="w-full">
    <div class="px-8 py-2 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="w-[40px] h-[34px] flex items-center justify-center">
          <TrezorDeviceIcon v-if="isTrezor" class="w-full max-h-[34px]" />
          <LedgerDeviceIcon v-else-if="isLedger" class="w-full max-h-[34px]" />
          <FontAwesomeIcon v-else-if="isAsylia" :icon="['fas', 'signature-lock']" class="" />
          <div v-else>? todo</div>
        </div>
        <div class="flex flex-col font-roboto-mono">
          <div class="text font-semibold text-gray-200">
            {{ props.extendedPubKey.name || `Sign key ${props.index}` }}
          </div>
          <div class="text-xs uppercase text-gray-300">
            {{ props.extendedPubKey.method }}
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <UButton
          v-if="!keyIsFullySetUp && !isAsylia"
          label="Add"
          size="xs"
          color="info"
          class="!rounded-sm hover:cursor-pointer"
        >
          <template #trailing>
            <FontAwesomeIcon :icon="['fas', 'link']" class="text-xs" />
          </template>
        </UButton>

        <template v-else>
          <FontAwesomeIcon v-if="keyIsFullySetUp" :icon="['fas', 'check']" class="text-success" />
          <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
        </template>
      </div>
    </div>

    <hr v-if="props.divider" class="border-t pb-1 border-white/5" />
  </div>
</template>

<script setup lang="ts">
import TrezorDeviceIcon from '@shared/images/icons/TrezorDeviceIcon.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import LedgerDeviceIcon from '@shared/images/icons/LedgerDeviceIcon.vue';
import { SIGN_DEVICES_LIST, type WalletExtendedPublicKey } from '@shared/types/SignKeys';
import { extendedPublicKeyIsSetUp } from '@packages/asylia-wallets/CreateWallet';

const props = withDefaults(
  defineProps<{
    extendedPubKey: WalletExtendedPublicKey;
    index: number;
    divider?: boolean;
  }>(),
  {
    divider: true,
  },
);

const isTrezor = computed(() => {
  return props.extendedPubKey.method === SIGN_DEVICES_LIST.TREZOR;
});

const isLedger = computed(() => {
  return props.extendedPubKey.method === SIGN_DEVICES_LIST.LEDGER;
});

const isAsylia = computed(() => {
  return props.extendedPubKey.method === SIGN_DEVICES_LIST.ASYLIA;
});

const keyIsFullySetUp = computed(() => extendedPublicKeyIsSetUp(props.extendedPubKey));
</script>
