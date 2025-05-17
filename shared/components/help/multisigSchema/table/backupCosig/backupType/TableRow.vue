<template>
  <TableRowWrapper :index="props.index" :is-last="props.isLast" :is2of3="is2of3" :is3of5="is3of5">
    <!-- Desktop version - hidden on mobile, visible on md and up -->
    <div
      :class="{
        'row-span-2': is2of3,
        'row-span-3': is3of5,
        'border-t': props.index === 0,
      }"
      class="hidden md:flex md:col-span-8 text-slate-500 dark:text-gray-300 justify-center items-stretch border-b border-r border-gray-300 dark:border-gray-700"
    >
      <div
        class="border-r w-[120px] shrink-0 grow-0 border-gray-300 dark:border-gray-700 py-1 flex items-center justify-center"
      >
        {{ textF('multisig_schema.body.one_account') }}
      </div>
      <div class="py-1 flex-1 flex items-center justify-center">
        <b>{{ textF('multisig_schema.body.wallet_owner') }}</b> -
        {{ textF('multisig_schema.body.majority') }}
      </div>
    </div>

    <KeyCheckCol :active="props.scheme[0]" :bt="props.index === 0" />

    <div
      :class="[
        {
          'row-span-2': is2of3,
          'row-span-3': is3of5,
          'border-t': props.index === 0,
          'rounded-tr-md': props.index === 0,
        },
      ]"
      class="hidden md:flex md:col-span-1 py-2 px-2 items-center justify-center border-r border-b border-gray-300 dark:border-gray-700"
    >
      <FontAwesomeIcon v-if="isActive" :icon="['fas', 'circle-check']" class="text-success" />
      <FontAwesomeIcon v-else :icon="['fas', 'circle-xmark']" class="text-base text-error" />
    </div>

    <KeyCheckCol :active="props.scheme[1]" :bb="is2of3" />
    <KeyCheckCol v-if="is3of5" :active="props.scheme[2]" bb />

    <div
      :class="{ 'row-span-2': is3of5 }"
      class="hidden md:flex md:col-span-8 text-slate-500 dark:text-gray-300 text-center border-r border-b border-gray-300 dark:border-gray-700 items-stretch justify-center"
    >
      <div
        class="border-r w-[120px] shrink-0 grow-0 py-2 border-gray-300 dark:border-gray-700 flex items-center justify-center"
      >
        Asylia.io
      </div>
      <div class="flex-1 flex py-2 px-4 items-center justify-center">
        <b>{{ textF('multisig_schema.body.backup') }}</b> - {{ textF('multisig_schema.body.minority') }}
      </div>
    </div>

    <KeyCheckCol :active="props.scheme[is2of3 ? 2 : 3]" :bb="is2of3" />

    <div
      :class="{ 'row-span-2': is3of5, 'rounded-br-md': props.isLast }"
      class="hidden md:flex md:col-span-1 row-span-1 py-2 px-2 border-b border-r items-center justify-center border-gray-300 dark:border-gray-700"
    >
      <FontAwesomeIcon :icon="['fas', 'circle-xmark']" class="text-base text-error" />
    </div>

    <KeyCheckCol v-if="is3of5" :active="props.scheme[14]" bb />

    <!-- Mobile version - visible on small screens, hidden on md and up -->
    <div
      class="md:hidden r col-span-10 flex flex-col border-r border-b border-gray-300 dark:border-gray-700"
      :class="{
        'border-t': props.index === 0,
        'rounded-tr-md': props.index === 0,
        'rounded-br-md': props.isLast,
      }"
    >
      <!-- Wallet Owner Section -->
      <div class="border-b border-gray-300 dark:border-gray-700 p-3">
        <div class="flex justify-between items-center mb-2">
          <div class="md:flex items-center">
            <div class="mr-2 text-sm font-semibold text-slate-500 dark:text-gray-300">
              {{ textF('multisig_schema.body.one_account') }}
            </div>
            <div class="text-slate-500 dark:text-gray-300">
              <b>{{ textF('multisig_schema.body.wallet_owner') }}</b> -
              {{ textF('multisig_schema.body.majority') }}
            </div>
          </div>
          <div class="ml-2">
            <FontAwesomeIcon v-if="isActive" :icon="['fas', 'circle-check']" class="text-success" />
            <FontAwesomeIcon v-else :icon="['fas', 'circle-xmark']" class="text-base text-error" />
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            class="bg-gray-800 px-3 py-1 rounded-md flex items-center gap-2"
            :class="{ 'bg-opacity-50': !props.scheme[0] }"
          >
            <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
            <span>{{ textF('multisig_schema.body.key') }} 1</span>
            <FontAwesomeIcon v-if="props.scheme[0]" :icon="['fas', 'check']" class="text-success" />
            <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
          </div>
          <div
            class="bg-gray-800 px-3 py-1 rounded-md flex items-center gap-2"
            :class="{ 'bg-opacity-50': !props.scheme[1] }"
          >
            <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
            <span>{{ textF('multisig_schema.body.key') }} 2</span>
            <FontAwesomeIcon v-if="props.scheme[1]" :icon="['fas', 'check']" class="text-success" />
            <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
          </div>
          <div
            v-if="is3of5"
            class="bg-gray-800 px-3 py-1 rounded-md flex items-center gap-2"
            :class="{ 'bg-opacity-50': !props.scheme[2] }"
          >
            <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
            <span>{{ textF('multisig_schema.body.key') }} 3</span>
            <FontAwesomeIcon v-if="props.scheme[2]" :icon="['fas', 'check']" class="text-success" />
            <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
          </div>
        </div>
      </div>

      <!-- Backup Section -->
      <div class="p-3" :class="{ 'rounded-br-md': props.isLast }">
        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <div class="mr-2 text-sm font-semibold text-slate-500 dark:text-gray-300">
              Asylia.io
            </div>
            <div class="text-slate-500 dark:text-gray-300">
              <b>{{ textF('multisig_schema.body.backup') }}</b> -
              {{ textF('multisig_schema.body.minority') }}
            </div>
          </div>
          <div class="ml-2">
            <FontAwesomeIcon :icon="['fas', 'circle-xmark']" class="text-base text-error" />
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            class="bg-gray-800 px-3 py-1 rounded-md flex items-center gap-2"
            :class="{ 'bg-opacity-50': !props.scheme[is2of3 ? 2 : 3] }"
          >
            <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
            <span>{{ textF('multisig_schema.body.key') }} {{ is2of3 ? 3 : 4 }}</span>
            <FontAwesomeIcon
              v-if="props.scheme[is2of3 ? 2 : 3]"
              :icon="['fas', 'check']"
              class="text-success"
            />
            <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
          </div>
          <div
            v-if="is3of5"
            class="bg-gray-800 px-3 py-1 rounded-md flex items-center gap-2"
            :class="{ 'bg-opacity-50': !props.scheme[14] }"
          >
            <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
            <span>{{ textF('multisig_schema.body.key') }} 5</span>
            <FontAwesomeIcon v-if="props.scheme[14]" :icon="['fas', 'check']" class="text-success" />
            <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
          </div>
        </div>
      </div>
    </div>
  </TableRowWrapper>
</template>

<script setup lang="ts">
import TableRowWrapper from '@shared/components/help/multisigSchema/table/backupCosig/TableRowWrapper.vue';
import KeyCheckCol from '@shared/components/help/multisigSchema/table/KeyCheckCol.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import { walletRowHelpers } from '@shared/components/help/multisigSchema/composuables';
import { textF } from '@shared/composuables/language';

const props = defineProps<{
  activeInactive: string;
  keyVariant: string;
  scheme?: number[];
  index: number;
  isLast?: boolean;
}>();

const { is2of3, is3of5, isActive } = walletRowHelpers({
  keyVariant: props.keyVariant,
  activeInactive: props.activeInactive,
});
</script>
