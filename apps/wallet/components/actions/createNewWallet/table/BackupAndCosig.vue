<template>
  <div class="w-full mt-4">
    <UFormField label="Wallet name" required class="w-full max-w-[25%]">
      <template #hint>
        <!--              <FontAwesomeIcon :icon="['fal', 'wallet']" class="text-xs text-primary" />-->
      </template>
      <UInput v-model="name" placeholder="Example name" size="lg" class="mt-2 w-full" />
    </UFormField>

    <div class="mt-5 w-[100%] rounded-md border-white/10">
      <div class="w-full flex items-stretch">
        <div
          class="flex flex-col border-r border-l border-t rounded-tl-md border-white/10 justify-center items-center w-[33%]"
        >
          <div class="px-2 py-1 flex items-center space-x-3 text-xl text-center">
            <UTooltip text="Wallet 2 of 3" arrow :content="{ side: 'top' }">
              <FontAwesomeIcon :icon="['fal', 'wallet']" class="text-primary text-2xl" />
            </UTooltip>
            <span v-if="isBackup"> Local Wallet</span>
            <span v-else-if="isCosig"> Shared Wallet</span>
          </div>
          <div class="flex items-center space-x-3 px-2 py-1 mt-2">
            <UTooltip text="Key 1" arrow :content="{ side: 'top' }">
              <FontAwesomeIcon :icon="['fal', 'key']" class="text-primary text-lg" />
            </UTooltip>
            <UTooltip text="Key 2" arrow :content="{ side: 'top' }">
              <FontAwesomeIcon :icon="['fal', 'key']" class="text-primary text-lg" />
            </UTooltip>
            <UTooltip v-if="is2of3" text="Backup (Key 3)" arrow :content="{ side: 'top' }">
              <FontAwesomeIcon :icon="['fal', 'key']" class="text-info text-lg" />
            </UTooltip>

            <template v-else-if="is3of5">
              <UTooltip text="Key 3" arrow :content="{ side: 'top' }">
                <FontAwesomeIcon :icon="['fal', 'key']" class="text-primary text-lg" />
              </UTooltip>
              <UTooltip text="Backup (Key 4)" arrow :content="{ side: 'top' }">
                <FontAwesomeIcon :icon="['fal', 'key']" class="text-info text-lg" />
              </UTooltip>
              <UTooltip text="Backup (Key 5)" arrow :content="{ side: 'top' }">
                <FontAwesomeIcon :icon="['fal', 'key']" class="text-info text-lg" />
              </UTooltip>
            </template>
          </div>
        </div>
        <div class="flex flex-col items-center text-center justify-center flex-1">
          <KeyUser :isBackup="isBackup" :index="0" />
          <KeyUser :isBackup="isBackup" :index="1" />
          <KeyUser v-if="is3of5" :isBackup="isBackup" :index="2" />
        </div>
      </div>

      <div class="flex border-white/10 items-stretch">
        <div
          class="flex border-t border-l border-b border-r border-white/10 items-center justify-center w-[33%] p-2 space-x-3 shrink-0"
          :class="{
            'rounded-bl-md': is2of3,
          }"
        >
          <UTooltip text="Backup key" arrow :content="{ side: 'top' }">
            <FontAwesomeIcon :icon="['fal', 'shield-keyhole']" class="text-info text-xl" />
          </UTooltip>
          <div class="text-xl">Backup key</div>
        </div>

        <div class="w-full flex flex-col">
          <KeyAsylia :index="is2of3 ? 2 : 3" :is-last="is2of3" />
          <KeyAsylia v-if="is3of5" :index="4" :is-last="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KeyUser from '~/components/actions/createNewWallet/table/row/KeyUser.vue';
import KeyAsylia from '~/components/actions/createNewWallet/table/row/KeyAsylia.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import {
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS,
  WALLET_STRUCTURE_TYPE,
} from '@shared/types/WalletStructure';
import type {
  WalletQuorumPreSetSchemaOptionsType,
  WalletStructureType,
} from '@shared/types/WalletStructure';

const props = defineProps<{
  presetSchema: WalletQuorumPreSetSchemaOptionsType;
  walletType: WalletStructureType;
}>();

const name = ref('');

const isBackup = computed<boolean>(() => props.walletType === WALLET_STRUCTURE_TYPE.BACKUP);

const isCosig = computed<boolean>(() => props.walletType === WALLET_STRUCTURE_TYPE.CONSIGNER);

const is2of3 = computed<boolean>(
  () => props.presetSchema === WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3'],
);

const is3of5 = computed<boolean>(
  () => props.presetSchema === WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['3of5'],
);
</script>
