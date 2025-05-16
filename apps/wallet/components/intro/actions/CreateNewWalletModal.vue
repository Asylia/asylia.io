<template>
  <UModal
    v-model:open="show"
    title="Create wallet"
    description="Create a new wallet by schema"
    class="w-full max-w-5xl"
  >
    <template #body>
      <div class="flex items-center justify-between">
        <WalletTypePicker v-model="state.walletType" />
        <WalletQuorumPreSetSchemeOptions v-model="state.presetSchema" />
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-between">
        <UButton label="Cancel" color="neutral" variant="outline" @click="show = false" />
        <UButton label="Submit" color="neutral" />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import WalletTypePicker from '@shared/components/wallet/setup/WalletTypePicker.vue';
import WalletQuorumPreSetSchemeOptions from '@shared/components/wallet/setup/quorum/WalletQuorumPreSetSchemeOptions.vue';
import {
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS,
  WALLET_STRUCTURE_TYPE,
  type WalletStructureType,
} from '@shared/types/WalletStructure';

import { type WalletQuorumPreSetSchemaOptionsType } from '@shared/types/WalletStructure';

const show = defineModel<boolean>();

type NewWalletType = {
  walletType: WalletStructureType;
  presetSchema: WalletQuorumPreSetSchemaOptionsType;
};

const state = reactive<NewWalletType>({
  walletType: WALLET_STRUCTURE_TYPE.BACKUP,
  presetSchema: WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3'],
});
</script>
