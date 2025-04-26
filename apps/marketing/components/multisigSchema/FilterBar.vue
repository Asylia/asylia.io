<template>
  <div class="w-full md:flex items-center mt-5 justify-between">
    <UTabs v-model="walletType" :items="walletTypeOptions" class="w-full md:max-w-[360px] w-full" />
    <UTabs
      v-model="activeInactive"
      :items="activeInactiveOptions"
      :color="activeInactive === SCENARIO_ACTIVE_INACTIVE.ACTIVE ? 'success' : 'warning'"
      class="w-full max-w-[120px]"
    />
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

import {
  WalletMultiSignatureTypes,
  SCENARIO_ACTIVE_INACTIVE,
  type WalletMultiSignatureType,
} from '~/utils/constants/ui/wallet';

const walletType = defineModel<WalletMultiSignatureType>('walletType');
const activeInactive = defineModel<WalletMultiSignatureType>('activeInactive');

const { t } = useI18n();

const walletTypeOptions = ref<TabsItem[]>([
  {
    value: WalletMultiSignatureTypes.BACKUP,
    label: t('multisig_schema.filter.p1'),
    icon: 'ic:outline-shield',
  },
  {
    value: WalletMultiSignatureTypes.CONSIGNER,
    label: t('multisig_schema.filter.p2'),
    icon: 'fluent:person-passkey-16-regular',
  },
  {
    value: WalletMultiSignatureTypes.MULTISIG,
    label: t('multisig_schema.filter.p3'),
    icon: 'bitcoin-icons:two-keys-outline',
  },
]);

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
