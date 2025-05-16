<template>
  <UTabs
    v-model="state"
    color="neutral"
    :items="presetSchemaOptionsList"
    :disabled="props.disabled"
  />
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { tFallback } from '@shared/composuables/language';
import {
  WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS,
  type WalletQuorumPreSetSchemaOptionsType,
} from '@shared/types/WalletStructure';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const state = defineModel<WalletQuorumPreSetSchemaOptionsType>();

const presetSchemaOptionsList = ref<TabsItem[]>([
  {
    value: WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3'],
    label: tFallback('2of3', '2of3'),
  },
  {
    value: WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['3of5'],
    label: tFallback('3of5', '3of5'),
  },
]);
</script>
