<template>
  <UModal
    v-model:open="show"
    title="Create wallet"
    description="Create a new wallet by schema"
    class="w-full max-w-5xl"
  >
    <template #body>
      <USlideover
        v-model:open="helpOpened"
        title="Help book"
        description="Explanation: What kind of wallet do you want to create?"
        class="w-full max-w-[40vw]"
      >
        <template #body>
          <MultisigSchema />
        </template>
      </USlideover>

      <div class="flex items-center justify-between">
        <WalletTypePicker v-model="state.walletType" class="w-full max-w-[520px]" />
        <WalletQuorumPreSetSchemeOptions
          v-model="state.presetSchema"
          class="w-full max-w-[230px]"
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
          <UButton label="Create" size="md" color="primary" />
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import WalletTypePicker from '@shared/components/wallet/setup/WalletTypePicker.vue';
import WalletQuorumPreSetSchemeOptions from '@shared/components/wallet/setup/quorum/WalletQuorumPreSetSchemeOptions.vue';
import MultisigSchema from '@shared/components/help/multisigSchema/MultisigSchema.vue';
import {
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS,
  WALLET_STRUCTURE_TYPE,
  type WalletStructureType,
} from '@shared/types/WalletStructure';

import { type WalletQuorumPreSetSchemaOptionsType } from '@shared/types/WalletStructure';

const show = defineModel<boolean>();

const helpOpened = ref(true);

type NewWalletType = {
  walletType: WalletStructureType;
  presetSchema: WalletQuorumPreSetSchemaOptionsType;
};

const state = reactive<NewWalletType>({
  walletType: WALLET_STRUCTURE_TYPE.BACKUP,
  presetSchema: WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3'],
});
</script>
