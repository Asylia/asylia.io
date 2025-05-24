<template>
  <div
    class="w-full relative flex border-l border-white/5 group transition-opacity duration-100"
    :class="{
      'rounded-br-md': isFirst,
      'rounded-br-md rounded-bl-md': isLast,
      'hover:opacity-70': !isSelected,
    }"
  >
    <hr
      v-if="!isLast && !isNextSelected && !isSelected"
      class="border-t bottom-0 left-0 w-full absolute border-white/10"
    />

    <div
      class="w-4 bg-dark-secondary"
      :class="{
        'rounded-bl-md': isLast && !isLastSelected,
        'rounded-b-md': isLast && isLastSelected,
      }"
    />

    <div class="w-full bg-dark-secondary">
      <MenuItem :wallet="item" :is-selected="isSelected" :is-last="isLast" />
    </div>

    <div
      class="w-4"
      :class="{
        'rounded-br-md': isLast || isNextSelected,
        'rounded-tr-md': isPreviousSelected,
        'bg-dark-secondary': !isSelected,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import MenuItem from '~/components/wallet/walletNavigation/mainNavigation/MenuItem.vue';
import { type WalletListItem } from '@packages/asylia-wallets/WalletStorage';

const props = defineProps<{
  item: WalletListItem;
  index: number;
  totalLength: number;
  selectedIndex: number;
}>();

const isFirst = computed(() => {
  return props.index === 0;
});

const isLast = computed(() => {
  return props.index === props.totalLength - 1;
});

const isSelected = computed(() => {
  return props.selectedIndex === props.index;
});

const isPreviousSelected = computed(() => {
  return props.selectedIndex === props.index - 1;
});

const isNextSelected = computed(() => {
  return props.selectedIndex === props.index + 1;
});

const isLastSelected = computed(() => {
  return props.selectedIndex === props.totalLength - 1;
});
</script>
