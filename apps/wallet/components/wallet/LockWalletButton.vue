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

const toast = useToast();

const walletListStore = useWalletListStore();
const lockWallet = () => {
  try {
    walletListStore.lockSelectedWallet();
    toast.add({
      description: 'Wallet locked successfully',
      color: 'success',
    });
  } catch (error) {
    toast.add({
      description: 'Failed to lock wallet',
      color: 'danger',
    })
  }
};
</script>
