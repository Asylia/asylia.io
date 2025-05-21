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
      <div
        class="flex items-center space-x-2 grow"
        :class="hasPickedKey ? 'items-start' : 'items-center'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'key']"
          class="text-base"
          :class="[
            props.isBackupKey ? 'text-info' : 'text-primary',
            {
              'mt-1': hasPickedKey,
            },
          ]"
        />

        <div class="flex pl-2">
          <UFormField v-if="hasPickedKey" label="Key name" required>
            <UInput
              v-model="value.name"
              placeholder="Enter your key name"
              :ui="{ trailing: 'pe-1' }"
            >
              <template v-if="value.name.length" #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  icon="i-lucide-circle-x"
                  aria-label="Clear input"
                  @click="value.name = ''"
                />
              </template>
            </UInput>
          </UFormField>

          <div v-else class="font-semibold">
            {{ keyTitle }}
          </div>
        </div>
      </div>
      <div class="pl-8 pr-2 text-xs text-left text-secondary-400">
        <template v-if="!hasPickedKey">
          One of the following devices is one of your sign keys.
        </template>
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
      <SignDevice v-model="value" :type="SIGN_DEVICES_LIST.TREZOR" :has-picked-key="hasPickedKey" />
      <SignDevice
        v-model="value"
        :type="SIGN_DEVICES_LIST.LEDGER"
        :has-picked-key="hasPickedKey"
        class="border-x"
      />
      <SignDevice
        v-model="value"
        :type="SIGN_DEVICES_LIST.MOBILE_APP"
        :has-picked-key="hasPickedKey"
        :coming-soon="true"
      />
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
import SignDevice from '~/components/actions/createNewWallet/setUpNameAndQuorum/table/row/SignDevice.vue';
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
const keyTitle = computed(() => {
  return (props.isBackupWalletType ? 'Your Sign Key ' : 'Sign Key') + (props.index + 1);
});

const hasPickedKey = computed(() => {
  const method = value.value?.method;
  return method !== null && method !== undefined;
});

watch(hasPickedKey, (picked) => {
  if (picked && picked && value.value?.name === '') {
    value.value.name = keyTitle.value;
  }
});
</script>
