<template>
  <div class="w-full md:flex items-center mt-5 justify-between">
    <WalletTypePicker v-model="walletType" class="w-full md:max-w-[360px]" />
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
import { SCENARIO_ACTIVE_INACTIVE } from './types';
import type { TabsItem } from '@nuxt/ui';
import type { ScenarioActiveInactiveType } from '@shared/types/WalletStructure';
import type { WalletStructureType } from '@shared/types/WalletStructure';

const walletType = defineModel<WalletStructureType>('walletType');
const activeInactive = defineModel<ScenarioActiveInactiveType>('activeInactive');

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
