<template>
  <UButton
    label="Lock wallet"
    size="lg"
    color="primary"
    variant="soft"
    block
    class="mt-5 cursor-pointer"
    @click="lockWallet"
  >
    <template #trailing>
      <FontAwesomeIcon :icon="['fal', 'lock']" class="text-sm" />
    </template>
  </UButton>
</template>
<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import { useWalletStorageListStore } from '~/stores/wallet/storage/list';
import { useActiveWalletStore } from '~/stores/wallet/ActiveWalletStore';

const toast = useToast();

const walletStorageListStore = useWalletStorageListStore();
const activeWalletStore = useActiveWalletStore();

const lockWallet = () => {
  try {
    if (!activeWalletStore.activeWallet || !activeWalletStore.activeWalletId) {
      throw new Error('No wallet selected - SHOULD NEVER HAPPEN');
    }
    walletStorageListStore.lock(activeWalletStore.activeWalletId);
    toast.add({
      description: 'Wallet locked successfully',
      color: 'success',
    });
  } catch (error) {
    toast.add({
      description: 'Failed to lock wallet',
      color: 'danger',
    });
  }
};
</script>
