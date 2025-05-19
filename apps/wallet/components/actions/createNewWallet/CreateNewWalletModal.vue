<template>
  <UModal v-model:open="show" title="Create wallet" class="w-full max-w-5xl" :fullscreen="false">
    <template #body>
      <div class="w-full">
        <CreateNewWalletExplainWindow v-model="helpOpened" />

        <div class="flex items-center justify-between w-full">
          <WalletTypePicker v-model="state.walletType" class="w-full max-w-[60%]" />
          <WalletQuorumPreSetSchemeOptions
            v-model="state.presetSchema"
            class="w-full max-w-[25%]"
          />
        </div>



        <CreateWalletBackupAndCosig
          v-if="
            [WALLET_STRUCTURE_TYPE.BACKUP, WALLET_STRUCTURE_TYPE.CONSIGNER].includes(
              state.walletType,
            )
          "
          :preset-schema="state.presetSchema"
          :wallet-type="state.walletType"
        />

        <CreateWalletMultiSig v-if="state.walletType === WALLET_STRUCTURE_TYPE.MULTISIG" />
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
import CreateNewWalletExplainWindow from '@shared/components/help/createNewWallet/ExplainWindow.vue';
import {
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS,
  WALLET_STRUCTURE_TYPE,
} from '@shared/types/WalletStructure';

import type { WalletStructureType } from '@shared/types/WalletStructure';
import type { WalletQuorumPreSetSchemaOptionsType } from '@shared/types/WalletStructure';

import TrezorDeviceIcon from '@shared/images/icons/TrezorDeviceIcon.vue';
import LedgerDeviceIcon from '@shared/images/icons/LedgerDeviceIcon.vue';
import BitcoinIcon from '@shared/images/icons/BitcoinIcon.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import KeyUser from '~/components/actions/createNewWallet/table/row/KeyUser.vue';
import { SIGN_DEVICES_LIST } from '@shared/types/SignDevices';
import SignDevice from '~/components/actions/createNewWallet/table/row/SignDevice.vue';
import CreateWalletBackupAndCosig from '~/components/actions/createNewWallet/table/BackupAndCosig.vue';
import CreateWalletMultiSig from '~/components/actions/createNewWallet/table/MultiSig.vue';

const show = defineModel<boolean>();

const helpOpened = ref(false);

type NewWalletType = {
  name: string;
  walletType: WalletStructureType;
  presetSchema: WalletQuorumPreSetSchemaOptionsType;
};

const state = reactive<NewWalletType>({
  name: '',
  walletType: WALLET_STRUCTURE_TYPE.BACKUP,
  presetSchema: WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3'],
});
</script>
