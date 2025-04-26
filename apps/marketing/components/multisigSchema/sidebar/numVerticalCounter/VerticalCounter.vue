<template>
  <div class="flex items-center justify-center no-select space-x-8">
    <SingleCounter
      v-model="m"
      :min="mMin"
      :max="mMax"
      :title="$t('multisig_schema.aside.custom.required')"
    />
    <div class="text-gray-400 font-semibold no-select text-lg">
      {{ $t('of') }}
    </div>
    <SingleCounter
      v-model="n"
      :min="nMin"
      :max="nMax"
      :title="$t('multisig_schema.aside.custom.total')"
    />
  </div>
</template>

<script setup lang="ts">
import SingleCounter from '~/components/multisigSchema/sidebar/numVerticalCounter/VerticalSingleCounter.vue';

const m = defineModel<number>('m');
const n = defineModel<number>('n');

const BASE_MIN_MAX = {
  min: 1,
  max: 7,
};

const mMin = computed(() => BASE_MIN_MAX.min);
const mMax = computed(() => n.value);

const nMin = computed(() => {
  if (m.value === 1) return 2;
  return m.value;
});
const nMax = computed(() => BASE_MIN_MAX.max);
</script>
