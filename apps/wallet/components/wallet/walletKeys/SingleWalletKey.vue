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
          :loading="loading"
          label="Add"
          size="xs"
          color="info"
          class="!rounded-sm hover:cursor-pointer"
          @click="addKey"
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
import TrezorInteraction from '@packages/asylia-hw-wallets/Trezor';
import { useWalletInstanceStore } from '~/stores/wallet/WalletIInstanceStore';
import { useWalletListStore } from '~/stores/wallet/WalletListStore';
import deepClone from 'deep-clone';

// const g = new WalletKeyValidator();
// const extendedPublicKeyIsSetUp = g.extendedPublicKeyIsSetUp;

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

const method = computed(() => props.extendedPubKey.method);
const isTrezor = computed(() => {
  return method.value === SIGN_DEVICES_LIST.TREZOR;
});

const isLedger = computed(() => {
  return method.value === SIGN_DEVICES_LIST.LEDGER;
});

const isAsylia = computed(() => {
  return method.value === SIGN_DEVICES_LIST.ASYLIA;
});

const keyIsFullySetUp = computed(() => extendedPublicKeyIsSetUp(props.extendedPubKey));
// const keyIsFullySetUp = computed(() => extendedPublicKeyIsSetUp(props.extendedPubKey));

const walletInstanceStore = useWalletInstanceStore();
const walletListStore = useWalletListStore();

const loading = ref(false);
const addKey = async () => {
  loading.value = true;

  const originalKey = deepClone(props.extendedPubKey);

  // if (isTrezor.value) {
  //   loading.value = true;
  //   const payload = await TrezorInteraction.exportPublicKey();
  //   console.log('payload', payload);
  //
  //   if (payload.success) {
  //   } else {
  //   }
  //   loading.value = false;
  // }
  // const key = {
  //   path: "m/48'/0'/0'/1'",
  //   xfp: '96c0539d',
  //   xpub: 'xpub6FFFY2Sox4SB86s45tRQu189vqNG7UyPA3xRekpKSRZLG4TMF36RhyHTkKnJ4ZLdjxmLr1QMcwAiW9goXSewpbGaqEz9J1amkkDQPCPrzBy',
  // };

  try {
    const key = {
      name: props.extendedPubKey.name || `Sign key ${props.index}`,
      bip32Path: "m/48'/0'/0'/1'",
      xfp: '96c0539d',
      xpub: 'xpub6FFFY2Sox4SB86s45tRQu189vqNG7UyPA3xRekpKSRZLG4TMF36RhyHTkKnJ4ZLdjxmLr1QMcwAiW9goXSewpbGaqEz9J1amkkDQPCPrzBy',
      method: props.extendedPubKey.method,
    };

    // const key = {
    //   name: props.extendedPubKey.name || `Sign key ${props.index}`,
    //   bip32Path: "m/48'/0'/0'/1'",
    //   xfp: '9ea6b6de',
    //   xpub: 'xpub6DqsZhS2knACUFefZDC8SQ26avw8ZiThx1NebtFcF8sF6Nuiie77dNwb9s9Ho6ZmDvKfqiDdiadM1RWwiC2HVbb8ptS44MXqaUPcAeuYkMb',
    //   method: props.extendedPubKey.method,
    // };

    const keyUpdated = walletInstanceStore.updateKeyOnIndex({
      index: props.index,
      key,
    });
    if (!keyUpdated) throw new Error('Failed to update key');

    if (!walletInstanceStore.walletConfig) {
      throw new Error('Wallet config not found dewdew');
    }

    const updateConfig = await walletListStore.saveWalletConfig(walletInstanceStore.walletConfig);
    // const updateConfig = await walletInstanceStore.saveWalletConfig();
    if (!updateConfig) throw new Error('Failed to update wallet config');

    walletListStore.syncWalletListToLocalStorage();
  } catch (e) {
    console.error(e);

    walletInstanceStore.updateKey({
      index: props.index,
      key: originalKey,
    });
  } finally {
    loading.value = false;
  }
};
</script>
