<template>
  <div
    @click="selectDevice"
    class="relative flex-1 flex flex-col border-white/10 items-center justify-center group"
    :class="[
      inActive ? 'opacity-20 hover:cursor-not-allowed' : 'hover:cursor-pointer  ',
      {
        'text-primary': isSelected,
        'hover:opacity-50 hover-text-primary-100': !isSelected && !inActive,
      },
    ]"
    v-bind="$attrs"
  >
    <TrezorDeviceIcon v-if="props.type === SIGN_DEVICES_LIST.TREZOR" class="h-[24px] w-auto" />
    <LedgerDeviceIcon v-if="props.type === SIGN_DEVICES_LIST.LEDGER" class="h-[24px] w-auto" />
    <FontAwesomeIcon
      v-if="props.type === SIGN_DEVICES_LIST.MOBILE_APP"
      :icon="['fas', 'mobile-screen-button']"
      class="text-2xl"
    />
    <span class="text-xs mt-2 text-gray3200">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import LedgerDeviceIcon from '@shared/images/icons/LedgerDeviceIcon.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import TrezorDeviceIcon from '@shared/images/icons/TrezorDeviceIcon.vue';
import { SIGN_DEVICES_LIST } from '@shared/types/SignKeys';
import type { WalletExtendedPublicKey, SignDevicesListType } from '@shared/types/SignKeys';

const props = withDefaults(
  defineProps<{
    type: SignDevicesListType;
    disabled?: boolean;
    comingSoon?: boolean;
  }>(),
  {
    disabled: false,
    comingSoon: false,
  },
);

const value = defineModel<WalletExtendedPublicKey>();

const isSelected = computed(() => value.value?.method === props.type);

const selectDevice = () => {
  if (props.disabled || props.comingSoon) return;
  if (value.value?.method === undefined) return;
  value.value.method = isSelected.value ? null : props.type;
};

const TITLES = {
  [SIGN_DEVICES_LIST.TREZOR]: 'Trezor',
  [SIGN_DEVICES_LIST.LEDGER]: 'Ledger',
  [SIGN_DEVICES_LIST.MOBILE_APP]: 'Mobile app',
  [SIGN_DEVICES_LIST.ASYLIA]: 'Asylia - Safe key',
};

const deviceName = computed(() => {
  if (props.type === null) return '';
  return TITLES[props.type];
});

const title = computed(() => {
  if (props.comingSoon) return `${deviceName.value} (Coming soon)`;
  if (props.disabled) return `${deviceName.value} (Temporary Disabled)`;
  return deviceName.value;
});

const inActive = computed(() => props.disabled || props.comingSoon);
</script>
