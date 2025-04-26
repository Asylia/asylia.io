<template>
  <aside class="flex flex-col">
    <div class="mt-16">
      <UAlert
        v-if="isBackup"
        color="primary"
        :variant="isDark ? 'soft' : 'solid'"
        :title="$t('multisig_schema.aside.backup.title')"
        :description="$t('multisig_schema.aside.backup.p')"
        icon="ic:outline-shield"
      />

      <UAlert
        v-if="isCosign"
        color="primary"
        :variant="isDark ? 'soft' : 'solid'"
        :title="$t('multisig_schema.aside.cosig.title')"
        :description="$t('multisig_schema.aside.cosig.p')"
        icon="fluent:person-passkey-16-regular"
      />

      <UAlert
        v-if="isMultisig"
        color="primary"
        :variant="isDark ? 'soft' : 'solid'"
        :title="$t('multisig_schema.aside.multisig.title')"
        :description="$t('multisig_schema.aside.multisig.p')"
        icon="bitcoin-icons:two-keys-outline"
        class=""
      />
    </div>

    <UTabs
      v-if="!hidePredefinedSchemas"
      v-model="keyVariant"
      color="neutral"
      :items="keyVariantsList"
      :disabled="!customSchema.enabled"
      class="w-full mt-4 max-w-full"
    />

    <template v-if="isMultisig">
      <UAlert
        v-if="customSchema.enabled"
        color="warning"
        variant="subtle"
        :title="$t('multisig_schema.aside.custom.title')"
        :description="$t('multisig_schema.aside.custom.p')"
        icon="rivet-icons:exclamation-mark"
        class="mt-4"
      />

      <USwitch
        v-model="customSchema.enabled"
        :label="$t('multisig_schema.aside.custom.button')"
        class="mx-auto mt-4"
      />

      <NumVerticalCounter
        v-model:m="customSchema.m"
        v-model:n="customSchema.n"
        class="mt-5"
        :class="{ 'opacity-25 pointer-events-none': !customSchema.enabled }"
      />
    </template>
  </aside>
</template>

<script setup lang="ts">
import NumVerticalCounter from '~/components/multisigSchema/sidebar/numVerticalCounter/VerticalCounter.vue';
import type { TabsItem } from '@nuxt/ui';
import appColorMode from '@shared/composuables/ui/colorMode';
import {
  type customSchemaType,
  WalletBackupAnCosignerKeyVariants,
  WalletMultiSignatureTypes,
} from '~/utils/constants/ui/wallet.js';

const props = defineProps<{
  walletType: string;
}>();

const keyVariant = defineModel<WalletBackupAnCosignerKeyVariants>();
const customSchema = defineModel<customSchemaType>('customSchema');
const { t } = useI18n();
const { isDark } = appColorMode();

const isMultisig = computed(() => props.walletType === WalletMultiSignatureTypes.MULTISIG);
const isBackup = computed(() => props.walletType === WalletMultiSignatureTypes.BACKUP);
const isCosign = computed(() => props.walletType === WalletMultiSignatureTypes.CONSIGNER);

const keyVariantsList = ref<TabsItem[]>([
  {
    value: WalletBackupAnCosignerKeyVariants['2of3'],
    label: '2 ' + t('of') + ' 3',
  },
  {
    value: WalletBackupAnCosignerKeyVariants['3of5'],
    label: '3 ' + 'of' + ' 5',
  },
]);

const hidePredefinedSchemas = computed(
  () => customSchema.value && customSchema.value.enabled && isMultisig.value,
);
</script>
