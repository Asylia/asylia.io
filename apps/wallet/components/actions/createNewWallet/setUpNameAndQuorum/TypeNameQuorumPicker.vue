<template>
  <div class="w-full">
    <!-- Schema picker -->
    <div class="flex items-center justify-between w-full">
      <WalletTypePicker v-model="walletStructureType" class="w-full max-w-[60%]" />
      <WalletQuorumPreSetSchemeOptions v-model="presetSchema" class="w-full max-w-[25%]" />
    </div>
    <!-- wallet name -->
    <div class="flex mt-5 items-center space-x-2">
      <FontAwesomeIcon :icon="['fal', 'wallet']" class="text-primary text-lg" />
      <span class="text-base text-gray-300">Wallet name <span class="text-error">*</span></span>
    </div>
    <UInput v-model="name" placeholder="Example name" size="lg" class="w-full mt-2 max-w-[30%]" />
  </div>
</template>

<script setup lang="ts">
import WalletTypePicker from '@shared/components/wallet/setup/WalletTypePicker.vue';
import WalletQuorumPreSetSchemeOptions from '@shared/components/wallet/setup/quorum/WalletQuorumPreSetSchemeOptions.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import type { WalletQuorumPreSetSchemaOptionsType } from '@shared/components/wallet/setup/quorum/Types';
import type { WalletStructureType } from '@shared/types/Wallet';

const walletStructureType = defineModel<WalletStructureType>('walletStructureType');
const presetSchema = defineModel<WalletQuorumPreSetSchemaOptionsType>('presetSchema');
const name = defineModel<string>('name');

</script>
