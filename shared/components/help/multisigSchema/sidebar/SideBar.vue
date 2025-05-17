<template>
  <aside class="flex flex-col">
    <UAlert
      v-if="isBackup"
      color="primary"
      :variant="isDark ? 'soft' : 'solid'"
      :title="textF('multisig_schema.aside.backup.title')"
      :description="textF('multisig_schema.aside.backup.p')"
      icon="ic:outline-shield"
    />

    <UAlert
      v-if="isCosign"
      color="primary"
      :variant="isDark ? 'soft' : 'solid'"
      :title="textF('multisig_schema.aside.cosig.title')"
      :description="textF('multisig_schema.aside.cosig.p')"
      icon="fluent:person-passkey-16-regular"
    />

    <UAlert
      v-if="isMultisig"
      color="primary"
      :variant="isDark ? 'soft' : 'solid'"
      :title="textF('multisig_schema.aside.multisig.title')"
      :description="textF('multisig_schema.aside.multisig.p')"
      icon="bitcoin-icons:two-keys-outline"
      class=""
    />

    <WalletQuorumPreSetSchemeOptions
      v-if="!hidePredefinedSchemas"
      v-model="keyVariant"
      :disabled="!customSchema.enabled"
      class="w-full mt-4 max-w-full"
    />

    <template v-if="isMultisig">
      <UAlert
        v-if="customSchema.enabled"
        color="warning"
        variant="subtle"
        :title="textF('multisig_schema.aside.custom.title')"
        :description="textF('multisig_schema.aside.custom.p')"
        icon="rivet-icons:exclamation-mark"
        class="mt-4"
      />

      <USwitch
        v-model="customSchema.enabled"
        :label="textF('multisig_schema.aside.custom.button')"
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
import NumVerticalCounter from '@shared/components/help/multisigSchema/sidebar/numVerticalCounter/VerticalCounter.vue';
import WalletQuorumPreSetSchemeOptions from '@shared/components/wallet/setup/quorum/WalletQuorumPreSetSchemeOptions.vue';
import { WALLET_STRUCTURE_TYPE } from '@shared/types/WalletStructure';
import { type customSchemaType } from '@shared/types/WalletStructure';
import { type WalletQuorumPreSetSchemaOptionsType } from '@shared/types/WalletStructure';
import { textF } from '@shared/composuables/language';
import appColorMode from '@shared/composuables/ui/colorMode';

const props = defineProps<{
  walletType: string;
}>();

const keyVariant = defineModel<WalletQuorumPreSetSchemaOptionsType>();
const customSchema = defineModel<customSchemaType>('customSchema');
const { isDark } = appColorMode();

const isMultisig = computed(() => props.walletType === WALLET_STRUCTURE_TYPE.MULTISIG);
const isBackup = computed(() => props.walletType === WALLET_STRUCTURE_TYPE.BACKUP);
const isCosign = computed(() => props.walletType === WALLET_STRUCTURE_TYPE.CONSIGNER);

const hidePredefinedSchemas = computed(
  () => customSchema.value && customSchema.value.enabled && isMultisig.value,
);
</script>
