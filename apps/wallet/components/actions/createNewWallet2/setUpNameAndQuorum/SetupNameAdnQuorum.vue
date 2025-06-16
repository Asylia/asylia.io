<template>
  <UModal
    v-model:open="show"
    title="Create new wallet"
    class="w-full max-w-lg"
    :dismissible="false"
    :fullscreen="false"
  >
    <template #body>
      <div class="w-full">
        <!-- wallet name -->
        <div class="w-full">
          <div class="flex items-center space-x-2">
            <FontAwesomeIcon :icon="['fal', 'wallet']" class="text-primary text-lg" />
            <span class="text-base text-gray-300"
              >Wallet name <span class="text-error">*</span></span
            >
          </div>
          <UInput v-model="state.name" placeholder="Example name" size="lg" class="w-full mt-2" />
        </div>

        <UTabs
          v-model="walletSetupOptionsValue"
          :items="walletSetupOptions"
          class="mt-5"
          color="neutral"
        />

        <UAlert
          color="primary"
          variant="subtle"
          title="Heads up!"
          description="2 of 3 schema. This means that you will need 2 out of 3 keys to sign a transaction."
          icon="bitcoin-icons:two-keys-outline"
          class="mt-3"
        />

        <NumVerticalCounter
          v-if="walletSetupOptionsValue === WALLET_SETUP_OPTIONS_ENUM.CUSTOM"
          v-model:m="state.quorum.requiredSigners"
          v-model:n="state.quorum.totalSigners"
          class="mt-5"
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
        :actionDisabled="!walletNameValid"
        @cancel="show = false"
        @help="helpOpened = true"
        @action="createWalletPassword.show = true"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import ModalActionBaseFooter from '@shared/components/wallet/modal/ModalActionBaseFooter.vue';
import PasswordInput from '@/components/ui/inputs/PasswordInput.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import NumVerticalCounter from '@shared/components/help/multisigSchema/sidebar/numVerticalCounter/VerticalCounter.vue';
import { EMPTY_WALLET_CONFIG_STATE, getEmptyWalletConfig } from '@shared/consts/Wallet';
import { createWalletConfig } from '~/stores/wallet/p2wsh/config/create/CreateWalletConfig';
import { encryptWalletConfig } from '~/stores/wallet/storage/encryption/EncryptWallet';
import {
  useWalletStorageListStore,
  createEncryptWalletListItem,
} from '~/stores/wallet/storage/list';
import deepClone from 'deep-clone';
import PasswordHolder from '~/stores/wallet/storage/list/src/PasswordHolder';
import type { TabsItem } from '@nuxt/ui';
import type { WalletQuorumType } from '~/stores/wallet/p2wsh/config/types';
import type { WalletConfigType } from '@shared/types/WalletStructure';

const toast = useToast();

const walletStorageListStore = useWalletStorageListStore();

const WALLET_SETUP_OPTIONS_ENUM = {
  TWO_OF_THREE: '2of3',
  THREE_OF_FIVE: '3of5',
  CUSTOM: 'custom',
};

const walletSetupOptions = ref<TabsItem[]>([
  {
    value: WALLET_SETUP_OPTIONS_ENUM.TWO_OF_THREE,
    label: '2 of 3',
  },
  {
    value: WALLET_SETUP_OPTIONS_ENUM.THREE_OF_FIVE,
    label: '3 of 5',
  },
  {
    value: WALLET_SETUP_OPTIONS_ENUM.CUSTOM,
    label: 'Custom',
  },
]);

const walletSetupOptionsValue = ref(
  walletSetupOptions.value[0]?.value ?? WALLET_SETUP_OPTIONS_ENUM.TWO_OF_THREE,
);

const state = reactive({ ...getEmptyWalletConfig() });

watch(walletSetupOptionsValue, (val) => {
  if (val === WALLET_SETUP_OPTIONS_ENUM.TWO_OF_THREE) {
    state.quorum.requiredSigners = 2;
    state.quorum.totalSigners = 3;
  } else if (val === WALLET_SETUP_OPTIONS_ENUM.THREE_OF_FIVE) {
    state.quorum.requiredSigners = 3;
    state.quorum.totalSigners = 5;
  }
});

/*
 * ---
 */

const show = defineModel<boolean>();
const helpOpened = ref<boolean>(false);

const walletNameValid = computed<boolean>(() => {
  return state.name.length > 0;
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

  // create a deep clone of the state to avoid mutating the original state
  const walletConfig: WalletConfigType = deepClone(state);

  try {
    const newWalletConfig = createWalletConfig({
      name: walletConfig.name,
      quorum: walletConfig.quorum as WalletQuorumType,
    });

    const encryptedWalletConfig = await encryptWalletConfig(
      newWalletConfig,
      createWalletPassword.password,
    );

    const encryptedWalletListItem = await createEncryptWalletListItem(encryptedWalletConfig, {
      id: newWalletConfig.id,
      name: newWalletConfig.name,
      version: 1,
    });

    const add = walletStorageListStore.add(encryptedWalletListItem);
    walletStorageListStore.saveListToStorage();

    if (!add) {
      throw new Error('Failed to add wallet to storage list');
    }

    PasswordHolder.set(newWalletConfig.id, createWalletPassword.password);

    toast.add({
      title: 'Wallet created successfully',
      description: `Wallet "${newWalletConfig.name}" has been created.`,
      color: 'success',
    });

    navigateTo({
      name: 'wallet-walletId',
      params: {
        walletId: newWalletConfig.id,
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
