<template>
  <div class="mt-5 w-[100%] rounded-md border-white/10">
    <div class="w-full flex items-stretch">
      <div
        class="flex flex-col border-r border-l border-t rounded-tl-md border-white/10 justify-center items-center w-[25%]"
      >
        <div class="px-2 py-1 flex items-center space-x-3 text-xl text-center">
          <span v-if="isBackupWalletType"> Local Wallet</span>
          <span v-else-if="isCosigWalletType"> Shared Wallet</span>
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
      <div class="flex flex-col items-center text-center justify-center shrink-0 grow flex-1">
        <KeyUser
          v-model="props.extendedPublicKeys[0]"
          :isBackupWalletType="isBackupWalletType"
          :index="0"
        />
        <KeyUser
          v-model="props.extendedPublicKeys[1]"
          :isBackupWalletType="isBackupWalletType"
          :index="1"
        />
        <KeyUser
          v-model="props.extendedPublicKeys[2]"
          v-if="is3of5"
          :isBackupWalletType="isBackupWalletType"
          :index="2"
        />
      </div>
    </div>

    <div class="flex border-white/10 items-stretch">
      <div
        class="flex border-t border-l border-b border-r border-white/10 items-center justify-center w-[25%] p-2 space-x-3 shrink-0"
        :class="{
          'rounded-bl-md': is2of3,
        }"
      >
        <div class="text-xl">Backup key</div>
        <UTooltip text="Backup key" arrow :content="{ side: 'top' }">
          <FontAwesomeIcon :icon="['fal', 'shield-keyhole']" class="text-info text-xl" />
        </UTooltip>
      </div>

      <div class="w-full flex flex-col flex-1 shrink-0">
        <KeyAsylia
          :index="is2of3 ? 2 : 3"
          :is-last="is2of3"
          :allKeysSelected="props.allKeysSelected"
        />
        <KeyAsylia
          v-if="is3of5"
          :index="4"
          :is-last="true"
          :allKeysSelected="props.allKeysSelected"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KeyUser from '~/components/actions/createNewWallet/setUpNameAndQuorum/table/row/KeyUser.vue';
import KeyAsylia from '~/components/actions/createNewWallet/setUpNameAndQuorum/table/row/KeyAsylia.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import { WALLET_STRUCTURE_TYPE } from '@shared/types/Wallet';
import { WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS } from '@shared/components/wallet/setup/quorum/Types';
import type { WalletStructureType } from '@shared/types/Wallet';
import type { WalletQuorumPreSetSchemaOptionsType } from '@shared/components/wallet/setup/quorum/Types';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';

const props = defineProps<{
  presetSchema: WalletQuorumPreSetSchemaOptionsType;
  walletType: WalletStructureType;
  extendedPublicKeys: WalletExtendedPublicKey[];
  allKeysSelected: boolean;
}>();

const isBackupWalletType = computed<boolean>(
  () => props.walletType === WALLET_STRUCTURE_TYPE.BACKUP,
);

const isCosigWalletType = computed<boolean>(
  () => props.walletType === WALLET_STRUCTURE_TYPE.CONSIGNER,
);

const is2of3 = computed<boolean>(
  () => props.presetSchema === WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3'],
);

const is3of5 = computed<boolean>(
  () => props.presetSchema === WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['3of5'],
);
</script>
