<template>
  <UButton
    :variant="isDark ? 'outline' : 'solid'"
    icon="material-symbols:frame-inspect"
    trailing-icon="i-material-symbols:keyboard-double-arrow-down-rounded"
    size="sm"
    class="!rounded-sm hover:cursor-pointer"
    color="info"
    @click="scrollToMultisigSchema"
  >
    {{ $t('inspect_multisig_button') }}
  </UButton>
</template>

<script setup lang="ts">
import appColorMode from '@shared/composuables/ui/colorMode';

import {
  autoScrolledToMultisig,
  autoScrolledToMultisigFrom,
} from '@shared/components/help/multisigSchema/composuables';

const props = defineProps<{
  scrolledFrom: string;
}>();

const { isDark } = appColorMode();

const scrollToMultisigSchema = () => {
  const multisigSection = document.getElementById('multisig-table-explain');
  if (!multisigSection) return;
  autoScrolledToMultisig.value = true;
  autoScrolledToMultisigFrom.value = props.scrolledFrom;
  multisigSection.scrollIntoView({ behavior: 'smooth' });
};
</script>
