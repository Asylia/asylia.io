<template>
  <div
    @click="selectDevice"
    class="relative hover:cursor-pointer hover:opacity-75"
    :class="{
      'opacity-20 hover:cursor-not-allowed hover:opacity-25': props.disabled || props.comingSoon,
      'text-primary': isSelected,
    }"
  >
    <UTooltip :text="title" arrow :content="{ side: 'top' }">
      <TrezorDeviceIcon v-if="props.type === SIGN_DEVICES_LIST.TREZOR" class="h-[24px] w-auto" />
      <LedgerDeviceIcon v-if="props.type === SIGN_DEVICES_LIST.LEDGER" class="h-[24px] w-auto" />
      <FontAwesomeIcon
        v-if="props.type === SIGN_DEVICES_LIST.MOBILE_APP"
        :icon="['fas', 'mobile-screen-button']"
        class="text-2xl"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import LedgerDeviceIcon from '@shared/images/icons/LedgerDeviceIcon.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import TrezorDeviceIcon from '@shared/images/icons/TrezorDeviceIcon.vue';
import { SIGN_DEVICES_LIST } from '@shared/types/SignDevices';
import type { SignDevicesListType } from '@shared/types/SignDevices';

const props = withDefaults(
  defineProps<{
    type: SignDevicesListType | null;
    disabled?: boolean;
    comingSoon?: boolean;
  }>(),
  {
    disabled: false,
    comingSoon: false,
  },
);

const value = defineModel<SignDevicesListType>();

const isSelected = computed(() => value.value === props.type);

const selectDevice = () => {
  if (props.disabled || props.comingSoon) return;
  value.value = isSelected.value ? null : props.type;
};

const TITLES = {
  [SIGN_DEVICES_LIST.TREZOR]: 'Trezor',
  [SIGN_DEVICES_LIST.LEDGER]: 'Ledger',
  [SIGN_DEVICES_LIST.MOBILE_APP]: 'Mobile app',
};

const title = computed(() => {
  const deviceName = TITLES[props.type];
  if (props.comingSoon) return `${deviceName} (Coming soon)`;
  if (props.disabled) return `${deviceName} (Temporary Disabled)`;
  return deviceName;
});
</script>
