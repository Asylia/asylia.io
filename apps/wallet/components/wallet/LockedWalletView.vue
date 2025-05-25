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
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import PasswordInput from '~/components/ui/inputs/PasswordInput.vue';
import { useWalletListStore } from '~/stores/wallet/WalletListStore';
import { decryptJson } from '@packages/asylia-wallets/WalletStorageEncryption';
import cloneDeep from 'lodash/cloneDeep';
import { useWalletPasswordHolderStore } from '~/stores/wallet/WalletPasswordHolderStore';

const route = useRoute();
const walletListStore = useWalletListStore();
const walletPasswordHolderStore = useWalletPasswordHolderStore();

const unlockModal = ref(false);
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

const openUnlockModal = () => {
  unlockModal.value = true;
  password.value = '';
  showPassword.value = false;
};

// watch(
//   () => walletListStore.selectedWallet,
//   (wallet) => {
//     if (!wallet || wallet.isDecrypted) return;
//     unlockModal.value = true;
//   },
//   { immediate: true },
// );

const toast = useToast();

const unlockAction = async () => {
  loading.value = true;
  unlockModal.value = false;
  setTimeout(async () => {
    try {
      if (!walletListStore.selectedWallet?.config) return;
      const result = await decryptJson(walletListStore.selectedWallet.config, password.value);

      walletListStore.updateSelectedWallet({
        ...cloneDeep(walletListStore.selectedWallet),
        isDecrypted: true,
        config: result,
      });

      // todo only if wallet no fully setup
      walletPasswordHolderStore.setTempPasswordHolder(
        walletListStore.selectedWallet.id,
        password.value,
      );

      toast.add({
        title: 'Wallet Unlocked',
        description: 'Your wallet has been successfully unlocked.',
        color: 'success',
      });
    } catch (e) {
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
