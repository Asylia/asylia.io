<template>
  <USlideover
    v-model:open="show"
    title="Help book"
    description="Explanation: What kind of wallet do you want to create?"
    class="w-full max-w-[50vw]"
  >
    <template #body>
      <MultisigSchema />
    </template>
  </USlideover>
</template>
<script setup lang="ts">
import MultisigSchema from '@shared/components/help/multisigSchema/MultisigSchema.vue';

const show = defineModel<boolean>();
</script>
