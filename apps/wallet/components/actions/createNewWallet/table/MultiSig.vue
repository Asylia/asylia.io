<template>
  <div class="w-full mt-5 flex items-start justify-between">
    <div class="w-[65%]">
      ss
    </div>

    <div class="w-[25%] flex flex-col items-center">

      <NumVerticalCounter
        v-model:m="customSchema.m"
        v-model:n="customSchema.n"
        class="mt-5"
        :class="{ 'opacity-25 pointer-events-none': !customSchema.enabled }"
      />

      <USwitch
        v-model="customSchema.enabled"
        :label="textF('multisig_schema.aside.custom.button')"
        class="mx-auto mt-8"
      />

    </div>
  </div>
</template>
<script setup lang="ts">
import { textF } from '@shared/composuables/language';
import NumVerticalCounter from '@shared/components/help/multisigSchema/sidebar/numVerticalCounter/VerticalCounter.vue';

const customSchema = ref({
  enabled: false,
  m: 2,
  n: 3,
});

</script>
