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

        <TypeNameQuorumPicker
          v-model:wallet-structure-type="walletType"
          v-model:preset-schema="presetSchema"
          v-model:name="state.name"
        />

        <component
          :is="WalletComponent"
          :preset-schema="presetSchema"
          :wallet-type="walletType"
          :extendedPublicKeys="state.extendedPublicKeys"
          :allKeysSelected="allKeysSelected"
          :quorum="multisigQuorum"
          :custom-schema="customSchema"
        />
      </div>
    </template>

    <template #footer>
      <UModal
        v-model:open="createWalletPassword.show"
        title="Set wallet password"
        :ui="{ footer: 'justify-end' }"
      >
        <template #body>
          <div class="w-full">
            <PasswordInput
              v-model="createWalletPassword.password"
              v-model:show="createWalletPassword.showPassword"
            />
            <PasswordInput
              v-model="createWalletPassword.confirmPassword"
              v-model:show="createWalletPassword.showConfirmPassword"
              class="mt-4"
            />
          </div>
        </template>
        <template #footer>
          <UButton
            label="Create"
            :disabled="!createWalletPassword.passwordValid"
            color="primary"
            trailing-icon="material-symbols:arrow-right-alt"
            @click="createNewWalletAction"
            :loading="creating"
          />
        </template>
      </UModal>

      <ModalActionBaseFooter
        :actionDisabled="!canCreateWallet"
        @cancel="show = false"
        @help="helpOpened = true"
        @action="createWalletPassword.show = true"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import CreateNewWalletExplainWindow from '@shared/components/help/createNewWallet/ExplainWindow.vue';
import CreateWalletBackupAndCosig from '~/components/actions/createNewWallet/setUpNameAndQuorum/table/BackupAndCosig.vue';
import CreateWalletMultiSig from '~/components/actions/createNewWallet/setUpNameAndQuorum/table/MultiSig.vue';
import TypeNameQuorumPicker from '~/components/actions/createNewWallet/setUpNameAndQuorum/TypeNameQuorumPicker.vue';
import ModalActionBaseFooter from '@shared/components/wallet/modal/ModalActionBaseFooter.vue';
import PasswordInput from '@/components/ui/inputs/PasswordInput.vue';
import {
  EMPTY_SIGN_DEVICE_METHOD,
  EMPTY_WALLET_ASYLIA_EXTENDED_PUBLIC_KEY,
  EMPTY_WALLET_EXTENDED_PUBLIC_KEY,
} from '@shared/types/SignKeys';
import { WALLET_STRUCTURE_TYPE } from '@shared/types/Wallet';
import { EMPTY_WALLET_CONFIG_STATE, getEmptyWalletConfig } from '@shared/consts/Wallet';
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
import { createNewWallet } from '@packages/asylia-wallets/WalletStorage';
import { useWalletListStore } from '~/stores/wallet/WalletListStore';
import { useWalletPasswordHolderStore } from '~/stores/wallet/WalletPasswordHolderStore';
import deepClone from 'deep-clone'

const toast = useToast();
const walletListStore = useWalletListStore();
const walletPasswordHolderStore = useWalletPasswordHolderStore();

const show = defineModel<boolean>();
const helpOpened = ref<boolean>(false);
const presetSchema = ref<WalletQuorumPreSetSchemaOptionsType>(
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3'],
);
const walletType = ref<WalletStructureType>(WALLET_STRUCTURE_TYPE.BACKUP);

const WALLET_TYPES_COMPONENTS = {
  [WALLET_STRUCTURE_TYPE.BACKUP]: CreateWalletBackupAndCosig,
  [WALLET_STRUCTURE_TYPE.CONSIGNER]: CreateWalletBackupAndCosig,
  [WALLET_STRUCTURE_TYPE.MULTISIG]: CreateWalletMultiSig,
};

const WalletComponent = computed(() => {
  return WALLET_TYPES_COMPONENTS[walletType.value];
});

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
const state = ref<WalletConfigType>({ ...getEmptyWalletConfig() });

const stateValue = computed<WalletConfigType>(() => ({
  ...state.value,
  quorum: {
    requiredSigners: multisigQuorum.value.requiredSigners,
    totalSigners: multisigQuorum.value.totalSigners,
  },
}));

watch(
  [multisigQuorum, walletType, show],
  () => {
    const q = multisigQuorum.value;
    const requiredSigners = q.requiredSigners;
    const totalSigners = q.totalSigners;
    state.value.extendedPublicKeys = [];

    if (walletType.value === WALLET_STRUCTURE_TYPE.MULTISIG) {
      state.value.extendedPublicKeys = [];
      for (let i = 0; i < totalSigners; i++) {
        state.value.extendedPublicKeys.push({
          ...EMPTY_WALLET_EXTENDED_PUBLIC_KEY,
        });
      }
      return;
    }

    for (let i = 0; i < requiredSigners; i++) {
      state.value.extendedPublicKeys.push({
        ...EMPTY_WALLET_EXTENDED_PUBLIC_KEY,
      });
    }

    const diff = totalSigners - requiredSigners;
    for (let i = 0; i < diff; i++) {
      state.value.extendedPublicKeys.push({
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

const createWalletPassword = reactive({
  show: false,
  password: '',
  showPassword: false,
  confirmPassword: '',
  showConfirmPassword: false,
  passwordValid: computed((): boolean => {
    return (
      createWalletPassword.password.length > 0 &&
      createWalletPassword.password === createWalletPassword.confirmPassword
    );
  }),
});

const creating = ref(false);
const createNewWalletAction = async () => {
  creating.value = true;
  const walletConfig: WalletConfigType = deepClone(stateValue.value);

  try {
    const wallet = await createNewWallet({
      name: walletConfig.name,
      config: walletConfig,
      password: createWalletPassword.password,
    });

    walletListStore.addWalletToList(wallet);
    walletPasswordHolderStore.setTempPasswordHolder(wallet.id, createWalletPassword.password);

    toast.add({
      title: 'Wallet created successfully',
      description: `Wallet "${wallet.name}" has been created.`,
      color: 'success',
    });

    navigateTo({
      name: 'wallet-walletId',
      params: {
        walletId: wallet.id,
      },
    });
  } catch (e) {
    toast.add({
      title: 'Error creating wallet',
      description: (e as Error).message,
      color: 'error',
    });
  } finally {
    creating.value = false;
  }
};

// on close clear state
watch(show, (v) => {
  if (v) return;
  Object.assign(state, { ...EMPTY_WALLET_CONFIG_STATE });
});
</script>
