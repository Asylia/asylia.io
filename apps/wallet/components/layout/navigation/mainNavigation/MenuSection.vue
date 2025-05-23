<template>
  <div class="flex flex-col items-start w-full justify-start space-x-4 rounded-md">
    <div
      class="w-full relative bg-dark-secondary rounded-t-md pl-6 pr-4 py-2  cursor-pointer"
      :class="{
        'rounded-br-md': isFirstSelected || !isExpanded,
        'rounded-bl-md': !isExpanded,
      }"
    >

      <hr
        v-if="!isFirstSelected && isExpanded"
        class="border-t bottom-0 left-0 w-full absolute border-white/10"
      />

      <div class="flex justify-between items-center">
        <div class="flex items-center justify-start space-x-4">
          <FontAwesomeIcon
            :icon="['fads', 'wallet']"
            class="text-primary text-lg shrink-0 w-auto"
          />
          <span class="text-lg font-roboto-mono">Wallets</span>
        </div>
        <div
          @click="isExpanded = !isExpanded"
          class="flex items-center justify-center rounded-full p-1 hover:cursor-pointer border hover:border-white/10 border-transparent"
        >
          <FontAwesomeIcon
            :icon="['fal', isExpanded ? 'angle-up' : 'angle-down']"
            class="text-primary text-lg shrink-0 w-auto"
          />
        </div>
      </div>
    </div>

    <UCollapsible v-model:open="isExpanded" class="w-full bg-dark">
      <template #content>
        <template v-for="(item, index) in props.wallets" :key="item.id">
          <MenuItemWrapper
            :item="item"
            :index="index"
            :totalLength="props.wallets.length"
            :selectedIndex="selectedIndex"
            @click="selectWalletOnInex(index)"
          />
        </template>
      </template>
    </UCollapsible>
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import MenuItemWrapper from '~/components/layout/navigation/mainNavigation/MenuItemWrapper.vue';

const props = defineProps<{
  wallets: any[];
}>();

const isExpanded = ref(true);
const selectedIndex = ref<number>(0);

const isFirstSelected = computed(() => {
  return selectedIndex.value === 0;
});

const selectWalletOnInex = (index: number) => {
  selectedIndex.value = index;
};
</script>
