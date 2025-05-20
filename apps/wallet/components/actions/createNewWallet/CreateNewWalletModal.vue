<template>
  <UModal
    v-model:open="show"
    title="Create wallet"
    class="w-full max-w-5xl"
    :dismissible="false"
    :fullscreen="false"
  >
    <template #body>
      <div class="w-full">
        <CreateNewWalletExplainWindow v-model="helpOpened" />

        <div class="flex items-center justify-between w-full">
          <WalletTypePicker v-model="walletType" class="w-full max-w-[60%]" />
          <WalletQuorumPreSetSchemeOptions v-model="presetSchema" class="w-full max-w-[25%]" />
        </div>

        <div class="flex mt-5 items-center space-x-2">
          <FontAwesomeIcon :icon="['fal', 'wallet']" class="text-primary text-lg" />
          <span class="text-base text-gray-300">Wallet name <span class="text-error">*</span></span>
        </div>
        <UInput
          v-model="state.name"
          placeholder="Example name"
          size="lg"
          class="w-full mt-2 max-w-[30%]"
        />

        <CreateWalletBackupAndCosig
          v-if="
            [WALLET_STRUCTURE_TYPE.BACKUP, WALLET_STRUCTURE_TYPE.CONSIGNER].includes(
              walletType as any,
            )
          "
          :preset-schema="presetSchema"
          :wallet-type="walletType"
          :extendedPublicKeys="state.extendedPublicKeys"
          :allKeysSelected="allKeysSelected"
        />

        <CreateWalletMultiSig
          v-if="walletType === WALLET_STRUCTURE_TYPE.MULTISIG"
          :quorum="multisigQuorum"
          :custom-schema="customSchema"
          :extendedPublicKeys="state.extendedPublicKeys"
        />
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-between">
        <div class="flex space-x-2">
          <UButton
            label="Help"
            size="md"
            color="neutral"
            variant="subtle"
            trailing-icon="material-symbols:info"
            @click="helpOpened = true"
          />
        </div>
        <div class="flex space-x-2">
          <UButton
            label="Cancel"
            size="md"
            color="neutral"
            variant="outline"
            @click="show = false"
          />
          <UButton
            label="Create"
            size="md"
            color="primary"
            trailing-icon="material-symbols:arrow-right-alt"
            class="hover:cursor-pointer"
            :disabled="!canCreateWallet"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import WalletTypePicker from '@shared/components/wallet/setup/WalletTypePicker.vue';
import WalletQuorumPreSetSchemeOptions from '@shared/components/wallet/setup/quorum/WalletQuorumPreSetSchemeOptions.vue';
import CreateNewWalletExplainWindow from '@shared/components/help/createNewWallet/ExplainWindow.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import CreateWalletBackupAndCosig from '~/components/actions/createNewWallet/table/BackupAndCosig.vue';
import CreateWalletMultiSig from '~/components/actions/createNewWallet/table/MultiSig.vue';
import {
  EMPTY_SIGN_DEVICE_METHOD,
  EMPTY_WALLET_ASYLIA_EXTENDED_PUBLIC_KEY,
  EMPTY_WALLET_EXTENDED_PUBLIC_KEY,
  type EmptySignDeviceMethod,
} from '@shared/types/SignKeys';
import { WALLET_STRUCTURE_TYPE } from '@shared/types/Wallet';
import { WALLET_ADDRESS_TYPES } from '@shared/types/WalletAddress';
import { WALLET_CLIENT_TYPES } from '@shared/types/WalletStructure';
import { BTC_NETWORK } from '@shared/Config';
import {
  WALLET_PRESET_QUORUM,
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS,
} from '@shared/components/wallet/setup/quorum/Types';
import type { WalletConfigType, Quorum } from '@shared/types/WalletStructure';
import type { WalletStructureType } from '@shared/types/Wallet';
import type {
  WalletQuorumPreSetSchemaOptionsType,
  customSchemaType,
} from '@shared/components/wallet/setup/quorum/Types';

const show = defineModel<boolean>();

const helpOpened = ref<boolean>(false);
const presetSchema = ref<WalletQuorumPreSetSchemaOptionsType>(
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3'],
);
const walletType = ref<WalletStructureType>(WALLET_STRUCTURE_TYPE.BACKUP);

/*
 * Wallet Quorum
 * - custom schema for preset options (best practice 2of3 & 3of5)
 * - get multisig quorum from preset schema or custom schema
 */
const customSchema = ref<customSchemaType>({
  enabled: false,
  requiredSigners: 2,
  totalSigners: 3,
});

const multisigQuorum = computed<Quorum>(() => {
  if (customSchema.value.enabled)
    return {
      requiredSigners: customSchema.value.requiredSigners,
      totalSigners: customSchema.value.totalSigners,
    };
  return WALLET_PRESET_QUORUM[presetSchema.value];
});

/*
 * * Wallet structure
 * - reactive state for wallet structure to set data
 * - reactive getters for wallet structure to get data
 * - watch for multisig quorum to set extended public keys in reactive state
 */
const state = reactive<WalletConfigType>({
  name: '',
  addressType: WALLET_ADDRESS_TYPES.P2SH_P2WSH,
  network: BTC_NETWORK,
  client: {
    type: WALLET_CLIENT_TYPES.PUBLIC,
  },
  quorum: {
    requiredSigners: 2,
    totalSigners: 3,
  },
  extendedPublicKeys: [],
  startingAddressIndex: 0,
});

const stateValue = computed<WalletConfigType>(() => ({
  name: state.name,
  addressType: state.addressType,
  network: state.network,
  client: state.client,
  quorum: {
    requiredSigners: multisigQuorum.value.requiredSigners,
    totalSigners: multisigQuorum.value.totalSigners,
  },
  extendedPublicKeys: state.extendedPublicKeys,
  startingAddressIndex: 0,
}));

watch(
  [multisigQuorum, walletType],
  () => {
    const q = multisigQuorum.value;
    const requiredSigners = q.requiredSigners;
    const totalSigners = q.totalSigners;
    state.extendedPublicKeys = [];

    console.log('multisigQuorum', {
      requiredSigners,
      totalSigners,
    });

    if (walletType.value === WALLET_STRUCTURE_TYPE.MULTISIG) {
      state.extendedPublicKeys = [];
      for (let i = 0; i < totalSigners; i++) {
        state.extendedPublicKeys.push({
          ...EMPTY_WALLET_EXTENDED_PUBLIC_KEY,
        });
      }
      return;
    }

    for (let i = 0; i < requiredSigners; i++) {
      state.extendedPublicKeys.push({
        ...EMPTY_WALLET_EXTENDED_PUBLIC_KEY,
      });
    }

    const diff = totalSigners - requiredSigners;
    for (let i = 0; i < diff; i++) {
      state.extendedPublicKeys.push({
        ...EMPTY_WALLET_ASYLIA_EXTENDED_PUBLIC_KEY,
      });
    }
  },
  { immediate: true, deep: true },
);

const walletNameValid = computed<boolean>(() => {
  return stateValue.value.name.length > 0;
});
const allKeysSelected = computed<boolean>(() => {
  return stateValue.value.extendedPublicKeys.every(
    (key) => key.method !== EMPTY_SIGN_DEVICE_METHOD,
  );
});
const canCreateWallet = computed<boolean>(() => {
  return walletNameValid.value && allKeysSelected.value;
});
</script>
