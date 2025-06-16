<template>
  <div class="flex-col pl-8 flex-1 h-full flex items-center justify-center">
    <UModal
      v-model:open="unlockModal"
      title="Insert password for wallet"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <div class="w-full">
          <PasswordInput v-model="password" v-model:show="showPassword" />
        </div>
      </template>
      <template #footer>
        <UButton
          label="Unlock"
          color="primary"
          trailing-icon="material-symbols:arrow-right-alt"
          @click="unlockAction"
          class="cursor-pointer"
        >
          <template #trailing>
            <FontAwesomeIcon :icon="['fal', 'unlock']" class="" />
          </template>
        </UButton>
      </template>
    </UModal>

    <div class="w-[420px] p-8 bg-dark-secondary rounded-md">
      <FontAwesomeIcon :icon="['fas', 'lock']" class="mx-auto text-4xl text-gray-400" />
      <div class="font-roboto-mono text-3xl mt-5 text-primary text-center font-semibold">
        Wallet is Locked
      </div>
      <div class="flex items-center mt-5 justify-center">
        <UButton
          @click="openUnlockModal"
          :loading="loading"
          label="Unlock Wallet"
          color="primary"
          size="xl"
          class="cursor-pointer"
          trailing-icon="material-symbols:arrow-right-alt"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordInput from '~/components/ui/inputs/PasswordInput.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import { decryptWalletConfig } from '~/stores/wallet/storage/encryption/EncryptWallet';
import {
  useWalletStorageListStore,
  type EncryptedWalletListItemType,
} from '~/stores/wallet/storage/list';
import PasswordHolder from '~/stores/wallet/storage/list/src/PasswordHolder';
import { useActiveWalletStore } from '~/stores/wallet/ActiveWalletStore';

const unlockModal = ref(false);
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

const openUnlockModal = () => {
  unlockModal.value = true;
  password.value = '';
  showPassword.value = false;
};

const toast = useToast();

const walletStorageListStore = useWalletStorageListStore();
const activeWalletStore = useActiveWalletStore();

const unlockAction = async () => {
  loading.value = true;
  unlockModal.value = false;
  setTimeout(async () => {
    try {
      if (!activeWalletStore.activeWallet) {
        throw new Error('Wallet is not active - SHOULD NOT HAPPEN');
      }

      const selectedWalletData = activeWalletStore.activeWallet as EncryptedWalletListItemType;

      if (!selectedWalletData) {
        toast.add({
          title: 'Error',
          description: 'No wallet selected or wallet data is missing.',
          color: 'error',
        });
        return;
      }

      const decryptedWalletConfig = await decryptWalletConfig(
        selectedWalletData.config,
        password.value,
      );

      const success = walletStorageListStore.unlock(decryptedWalletConfig);

      if (!success) {
        throw new Error('Failed to unlock wallet');
      }

      PasswordHolder.set(decryptedWalletConfig.id, password.value);

      toast.add({
        title: 'Wallet Unlocked',
        description: 'Your wallet has been successfully unlocked.',
        color: 'success',
      });
    } catch (e) {
      console.error(e);
      toast.add({
        title: 'Unlock Failed',
        description: 'The password you entered is incorrect.',
        color: 'error',
      });
      unlockModal.value = true;
      password.value = '';
      return;
    } finally {
      loading.value = false;
    }
  }, 100);
};
</script>
