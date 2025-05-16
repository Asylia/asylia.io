<template>
  <UContainer>
    <AnimationWrapper id="multisig-table-explain" class="w-full mt-30">
      <div class="grid w-full lg:grid-cols-[240px_1fr] gap-2 lg:gap-8">
        <div />
        <div class="min-w-0">
          <div class="flex items-center justify-center md:justify-start space-x-2">
            <h2
              class="text-3xl text-center md:text-left font-bold text-slate-800 dark:text-white md:text-4xl"
            >
              {{ $t('multisig_schema.title') }}
            </h2>
          </div>
          <p
            class="italic text-center mx-auto md:text-left text-slate-600 dark:text-gray-500 mt-4 text-base md:text-lg"
          >
            {{ $t('multisig_schema.p') }}
          </p>
        </div>
      </div>

      <div id="multisig-table" class="grid w-full md:mt-12 lg:grid-cols-[240px_1fr] gap-2 lg:gap-8">
        <AsideContent
          v-model="keyVariant"
          v-model:custom-schema="customSchema"
          :wallet-type="walletType"
        />

        <div class="w-full text-gray-100 rounded min-w-0 text-sm">
          <FilterBar v-model:active-inactive="activeInactive" v-model:wallet-type="walletType" />

          <div class="w-full mt-4">
            <component
              :is="walletTypeTableComponent"
              :key="`${walletType}-${activeInactive}-${keyVariant}`"
              :active-inactive="activeInactive"
              :wallet-type="walletType"
              :key-variant="keyVariant"
              :quorum="walletQuorum"
              :custom-schema="customSchema"
            />
          </div>

          <div v-if="showScrollBackButton" class="w-full flex mt-5 items-center justify-end">
            <UButton
              :variant="isDark ? 'outline' : 'solid'"
              icon="i-lucide-scroll"
              trailing-icon="i-material-symbols:keyboard-double-arrow-up-rounded"
              size="sm"
              class="!rounded-sm hover:cursor-pointer"
              color="info"
              @click="scrollBackToWhitePaper4"
            >
              {{ $t('multisig_schema.backToWhitePaper') }}
            </UButton>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  </UContainer>
</template>

<script setup lang="ts">
import appColorMode from '@shared/composuables/ui/colorMode';

import AsideContent from '~/components/multisigSchema/sidebar/SideBar.vue';
import FilterBar from '@/components/multisigSchema/FilterBar.vue';
import MultisigRowBackupType from '~/components/multisigSchema/table/backupCosig/backupType/BackupType.vue';
import MultisigRowMultisigType from '~/components/multisigSchema/table/multisigType/MultisigType.vue';
import MultisigRowCoSignerType from '~/components/multisigSchema/table/backupCosig/cosignerType/CosignerType.vue';
import AnimationWrapper from '~/components/AnimationWrapper.vue';
import {
  WalletBackupAnCosignerKeyVariantsQuorum,
  SCENARIO_ACTIVE_INACTIVE,
  type customSchemaType,
} from '~/utils/constants/ui/wallet';
import {
  autoScrolledToMultisig,
  autoScrolledToMultisigFrom,
  SCROLLED_FROM,
} from '~/components/multisigSchema/composuables';
import { WALLET_STRUCTURE_TYPE } from '@shared/types/WalletStructure'
import { WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS } from '@shared/types/WalletStructure';

const { isDark } = appColorMode();

const walletType = ref(WALLET_STRUCTURE_TYPE.BACKUP);
const activeInactive = ref(SCENARIO_ACTIVE_INACTIVE.ACTIVE);
const keyVariant = ref(WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3']);
const customSchema = ref<customSchemaType>({
  enabled: false,
  m: 2,
  n: 3,
});

const walletTypesTables = {
  [WALLET_STRUCTURE_TYPE.BACKUP]: MultisigRowBackupType,
  [WALLET_STRUCTURE_TYPE.CONSIGNER]: MultisigRowCoSignerType,
  [WALLET_STRUCTURE_TYPE.MULTISIG]: MultisigRowMultisigType,
};

const walletTypeTableComponent = computed(() => walletTypesTables[walletType.value]);
const walletQuorum = computed(() => WalletBackupAnCosignerKeyVariantsQuorum[keyVariant.value]);
const showScrollBackButton = computed(
  () =>
    autoScrolledToMultisig.value &&
    [SCROLLED_FROM.INTRO.KEY, SCROLLED_FROM.POINT_4_4.KEY].includes(
      autoScrolledToMultisigFrom.value,
    ),
);

const scrollBackToWhitePaper4 = () => {
  let target = null;
  if (autoScrolledToMultisigFrom.value === SCROLLED_FROM.INTRO.KEY) target = SCROLLED_FROM.INTRO.ID;
  if (autoScrolledToMultisigFrom.value === SCROLLED_FROM.POINT_4_4.KEY)
    target = SCROLLED_FROM.POINT_4_4.ID;
  if (!target) return;
  const whitePaper4Section = document.getElementById(target);
  autoScrolledToMultisig.value = false;
  if (!whitePaper4Section) return;
  whitePaper4Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>
