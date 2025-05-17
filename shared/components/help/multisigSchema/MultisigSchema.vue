<template>
  <suspense>
    <div v-bind="$attrs">
      <AsideContent
        v-model="keyVariant"
        v-model:custom-schema="customSchema"
        :wallet-type="walletType"
        :class="props.asideClass"
      />

      <div class="w-full text-gray-100 rounded min-w-0 text-sm">
        <FilterBar v-model:active-inactive="activeInactive" v-model:wallet-type="walletType" />

        <DisplayTable
          :walletType="walletType"
          :keyVariant="keyVariant"
          :customSchema="customSchema"
          :active-inactive="activeInactive"
          class="mt-4"
        />

        <slot name="under-table" />
      </div>
    </div>
  </suspense>
</template>

<script setup lang="ts">
import FilterBar from '@shared/components/help/multisigSchema/FilterBar.vue';
import AsideContent from '@shared/components/help/multisigSchema/sidebar/SideBar.vue';
import DisplayTable from '@shared/components/help/multisigSchema/table/DisplayTable.vue';
import {
  type customSchemaType,
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS,
  WALLET_STRUCTURE_TYPE,
} from '@shared/types/WalletStructure';
import { SCENARIO_ACTIVE_INACTIVE } from '@shared/components/help/multisigSchema/types';

const props = defineProps<{
  asideClass?: string;
}>();

import { useLocalI18n } from '@shared/composuables/language';

await useLocalI18n(() => import('./locales.json'));

const walletType = ref(WALLET_STRUCTURE_TYPE.BACKUP);
const activeInactive = ref(SCENARIO_ACTIVE_INACTIVE.ACTIVE);
const keyVariant = ref(WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3']);
const customSchema = ref<customSchemaType>({
  enabled: false,
  m: 2,
  n: 3,
});
</script>
