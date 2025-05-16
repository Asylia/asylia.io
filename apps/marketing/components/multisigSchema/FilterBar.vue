<template>
  <div class="w-full md:flex items-center mt-5 justify-between">
    <WalletTypePicker v-model="walletType" class="w-full md:max-w-[360px]" />
    <!--    <UTabs v-model="walletType" :items="walletTypeOptions" class="w-full md:max-w-[360px] w-full" />-->
    <UTabs
      v-model="activeInactive"
      :items="activeInactiveOptions"
      :color="activeInactive === SCENARIO_ACTIVE_INACTIVE.ACTIVE ? 'success' : 'warning'"
      class="w-full max-w-[120px]"
    />
  </div>
</template>

<script setup lang="ts">
import WalletTypePicker from '@shared/components/wallet/setup/WalletTypePicker.vue';
import type { TabsItem } from '@nuxt/ui';

import {
  // WALLET_STRUCTURE_TYPE,
  SCENARIO_ACTIVE_INACTIVE,
  type ScenarioActiveInactiveType,
} from '~/utils/constants/ui/wallet';
import type { WalletStructureType } from '@shared/types/WalletStructure'


const walletType = defineModel<WalletStructureType>('walletType');
const activeInactive = defineModel<ScenarioActiveInactiveType>('activeInactive');

// const { t } = useI18n();

// const walletTypeOptions = ref<TabsItem[]>([
//   {
//     value: WALLET_STRUCTURE_TYPE.BACKUP,
//     label: t('multisig_schema.filter.p1'),
//     icon: 'ic:outline-shield',
//   },
//   {
//     value: WALLET_STRUCTURE_TYPE.CONSIGNER,
//     label: t('multisig_schema.filter.p2'),
//     icon: 'fluent:person-passkey-16-regular',
//   },
//   {
//     value: WALLET_STRUCTURE_TYPE.MULTISIG,
//     label: t('multisig_schema.filter.p3'),
//     icon: 'bitcoin-icons:two-keys-outline',
//   },
// ]);

const activeInactiveOptions = ref<TabsItem[]>([
  {
    value: SCENARIO_ACTIVE_INACTIVE.ACTIVE,
    icon: 'material-symbols:check-rounded',
  },
  {
    value: SCENARIO_ACTIVE_INACTIVE.INACTIVE,
    icon: 'material-symbols:close-rounded',
  },
]);
</script>
