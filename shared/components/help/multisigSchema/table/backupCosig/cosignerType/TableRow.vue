<template>
  <TableRowWrapper :index="props.index" :is-last="props.isLast" :is2of3="is2of3" :is3of5="is3of5">
    <!-- Desktop version - hidden on mobile, visible on md and up -->
    <div
      :class="{
        'row-span-2': is2of3,
        'row-span-3': is3of5,
        'border-t': props.index === 0,
      }"
      class="hidden md:flex flex-col items-stretch justify-center md:col-span-4 text-center text-slate-500 dark:text-gray-300 px-2 border-b border-r border-gray-300 dark:border-gray-700"
    >
      <div>
        {{ textF('multisig_schema.body.main_holder') }}
      </div>
      <span>
        {{ textF('multisig_schema.body.majority') }}
      </span>
    </div>

    <div
      :class="{
        'row-span-2': is2of3,
        'row-span-3': is3of5,
      }"
      class="hidden md:flex md:col-span-4 flex-col text-slate-500 dark:text-gray-300 justify-center border-b border-r border-gray-300 dark:border-gray-700"
    >
      <div
        v-if="is3of5"
        :class="{ 'border-t dark:border-gray-700': props.index === 0 && is3of5 }"
        class="text-center h-full flex items-center justify-center border-b w-full border-gray-300 dark:border-gray-700"
      >
        {{ textF('multisig_schema.body.key_holder') }} 1
      </div>
      <div
        :class="{ 'border-t dark:border-gray-700': props.index === 0 && is2of3 }"
        class="border-b w-full text-center flex items-center justify-center h-full border-gray-300 dark:border-gray-700"
      >
        {{ textF('multisig_schema.body.key_holder') }} {{ is3of5 ? 2 : 1 }}
      </div>
      <div class="h-full flex items-center justify-center">
        {{ textF('multisig_schema.body.key_holder') }} {{ is3of5 ? 3 : 2 }}
      </div>
    </div>

    <KeyCheckCol :active="props.scheme[0]" bb :bt="props.index === 0" />

    <div
      :class="{
        'row-span-2': is2of3,
        'row-span-3': is3of5,
        'border-t rounded-tr-md': props.index === 0,
      }"
      class="hidden md:flex md:col-span-1 border-b border-r py-2 px-2 items-center justify-center border-gray-300 dark:border-gray-700"
    >
      <FontAwesomeIcon v-if="isActive" :icon="['fas', 'circle-check']" class="text-success" />
      <FontAwesomeIcon v-else :icon="['fas', 'circle-xmark']" class="text-base text-error" />
    </div>

    <KeyCheckCol :active="props.scheme[1]" bb />
    <KeyCheckCol v-if="is3of5" :active="props.scheme[2]" bb />

    <div
      :class="[
        {
          'row-span-1': !is3of5,
          'row-span-2': is3of5,
        },
        is3of5 ? 'flex-col' : 'flex-row space-x-2',
      ]"
      class="hidden md:flex items-center justify-center md:col-span-4 text-center text-slate-500 dark:text-gray-300 px-2 border-b border-r border-gray-300 dark:border-gray-700"
    >
      <div>
        {{ textF('multisig_schema.body.backup') }}
      </div>
      <span>
        {{ textF('multisig_schema.body.minority') }}
      </span>
    </div>

    <div
      :class="{
        'row-span-2': is3of5,
      }"
      class="hidden md:flex md:col-span-4 text-slate-500 dark:text-gray-300 text-center border-r border-b border-gray-300 dark:border-gray-700 flex-col items-stretch justify-center"
    >
      <div
        v-if="is3of5"
        class="border-b w-full text-center flex items-center justify-center h-full border-gray-300 dark:border-gray-700"
      >
        Asylia.io / {{ textF('multisig_schema.body.custom') }}
      </div>
      <div
        class="w-full text-center flex items-center justify-center h-full border-gray-300 dark:border-gray-700"
      >
        Asylia.io / {{ textF('multisig_schema.body.custom') }}
      </div>
    </div>

    <KeyCheckCol :active="props.scheme[is3of5 ? 3 : 2]" bb />

    <div
      :class="{
        'row-span-2': is3of5,
        'rounded-br-md': props.isLast,
      }"
      class="hidden md:flex md:col-span-1 row-span-1 py-2 px-2 border-b border-r items-center justify-center border-gray-300 dark:border-gray-700"
    >
      <FontAwesomeIcon :icon="['fas', 'circle-xmark']" class="text-base text-error" />
    </div>

    <KeyCheckCol v-if="is3of5" :active="props.scheme[4]" bb />

    <!-- Mobile version - visible on small screens, hidden on md and up -->
    <div
      class="md:hidden col-span-10 flex flex-col border-r border-b border-gray-300 dark:border-gray-700"
      :class="{
        'border-t': props.index === 0,
        'rounded-tr-md': props.index === 0,
        'rounded-br-md': props.isLast,
      }"
    >
      <!-- Main holder section -->
      <div class="border-b border-gray-300 dark:border-gray-700 p-3">
        <div class="flex justify-between items-center mb-2">
          <div class="flex md:flex-col items-center">
            <div class="text-slate-500 dark:text-gray-300 font-semibold">
              {{ textF('multisig_schema.body.main_holder') }}
            </div>
            <div class="text-slate-500 dark:text-gray-300 text-sm ml-2 md:ml-0">
              {{ textF('multisig_schema.body.majority') }}
            </div>
          </div>
          <div class="ml-2">
            <FontAwesomeIcon v-if="isActive" :icon="['fas', 'circle-check']" class="text-success" />
            <FontAwesomeIcon v-else :icon="['fas', 'circle-xmark']" class="text-base text-error" />
          </div>
        </div>

        <!-- Key holders -->
        <div class="mt-3">
          <div
            v-if="is3of5"
            class="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700"
          >
            <div class="text-slate-500 dark:text-gray-300">
              {{ textF('multisig_schema.body.key_holder') }} 1
            </div>
            <div class="flex items-center gap-2">
              <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
              <FontAwesomeIcon v-if="props.scheme[0]" :icon="['fas', 'check']" class="text-success" />
              <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
            </div>
          </div>

          <div
            class="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700"
          >
            <div class="text-slate-500 dark:text-gray-300">
              {{ textF('multisig_schema.body.key_holder') }} {{ is3of5 ? 2 : 1 }}
            </div>
            <div class="flex items-center gap-2">
              <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
              <FontAwesomeIcon
                v-if="props.scheme[is3of5 ? 1 : 0]"
                :icon="['fas', 'check']"
                class="text-success"
              />
              <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
            </div>
          </div>

          <div class="flex items-center justify-between p-2">
            <div class="text-slate-500 dark:text-gray-300">
              {{ textF('multisig_schema.body.key_holder') }} {{ is3of5 ? 3 : 2 }}
            </div>
            <div class="flex items-center gap-2">
              <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
              <FontAwesomeIcon
                v-if="props.scheme[is3of5 ? 2 : 1]"
                :icon="['fas', 'check']"
                class="text-success"
              />
              <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
            </div>
          </div>
        </div>
      </div>

      <!-- Backup section -->
      <div class="p-3" :class="{ 'rounded-br-md': props.isLast }">
        <div class="flex justify-between items-center mb-2">
          <div class="flex md:flex-col items-center">
            <div class="text-slate-500 dark:text-gray-300 font-semibold">
              {{ textF('multisig_schema.body.backup') }}
            </div>
            <div class="text-slate-500 dark:text-gray-300 text-sm ml-2 md:ml-0">
              {{ textF('multisig_schema.body.minority') }}
            </div>
          </div>
          <div class="ml-2">
            <FontAwesomeIcon :icon="['fas', 'circle-xmark']" class="text-base text-error" />
          </div>
        </div>

        <!-- Backup key holders -->
        <div class="mt-3">
          <div
            v-if="is3of5"
            class="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700"
          >
            <div class="text-slate-500 dark:text-gray-300">
              Asylia.io / {{ textF('multisig_schema.body.custom') }}
            </div>
            <div class="flex items-center gap-2">
              <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
              <FontAwesomeIcon v-if="props.scheme[3]" :icon="['fas', 'check']" class="text-success" />
              <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
            </div>
          </div>

          <div class="flex items-center justify-between p-2">
            <div class="text-slate-500 dark:text-gray-300">
              Asylia.io / {{ textF('multisig_schema.body.custom') }}
            </div>
            <div class="flex items-center gap-2">
              <FontAwesomeIcon :icon="['fas', 'key']" class="text-primary" />
              <FontAwesomeIcon
                v-if="props.scheme[is3of5 ? 4 : 2]"
                :icon="['fas', 'check']"
                class="text-success"
              />
              <FontAwesomeIcon v-else :icon="['fas', 'xmark']" class="text-error" />
            </div>
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
