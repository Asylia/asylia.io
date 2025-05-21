<template>
  <div class="w-full flex items-start justify-between">
    <div class="w-[75%]">
      <div class="mt-5 w-[100%] rounded-md border-white/10">
        <div class="w-full flex items-stretch">
          <div class="flex flex-col items-center text-center justify-center shrink-0 grow flex-1">
            <KeyUser
              v-for="(_, i) in keysCount"
              v-model="props.extendedPublicKeys[i]"
              :border-l="true"
              :border-b="_ == keysCount"
              :is-last="_ === keysCount"
              :isBackupWalletType="false"
              :isBackupKey="i > props.customSchema.requiredSigners"
              :rounTl="i === 0"
              :index="i"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-[25%] flex flex-col items-center">
      <NumVerticalCounter
        v-model:m="props.customSchema.requiredSigners"
        v-model:n="props.customSchema.totalSigners"
        class="mt-5"
        :class="{ 'opacity-25 pointer-events-none': !props.customSchema.enabled }"
      />

      <USwitch
        v-model="props.customSchema.enabled"
        :label="textF('multisig_schema.aside.custom.button')"
        class="mx-auto mt-8"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import NumVerticalCounter from '@shared/components/help/multisigSchema/sidebar/numVerticalCounter/VerticalCounter.vue';
import KeyUser from '~/components/actions/createNewWallet/setUpNameAndQuorum/table/row/KeyUser.vue';
import { textF } from '@shared/composuables/language';
import type { Quorum } from '@shared/types/WalletStructure';
import type { customSchemaType } from '@shared/components/wallet/setup/quorum/Types';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';

const props = defineProps<{
  customSchema: customSchemaType;
  quorum: Quorum;
  extendedPublicKeys: WalletExtendedPublicKey[];
}>();

const keysCount = computed(() => props.quorum.totalSigners);
</script>
