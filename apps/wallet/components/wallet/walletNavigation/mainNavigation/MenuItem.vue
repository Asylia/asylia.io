<template>
  <div
    class="w-full py-3 cursor-pointer"
    :class="{
      'bg-dark-secondary': !isSelected,
      ' bg-dark': isSelected,
      'rounded-tl-md ': isSelected,
      'rounded-bl-md ': isSelected && !isLast,
    }"
  >
    <div class="flex py-1 grow items-center justify-between px-3">
      <div class="text-base font-semibold text-btc font-roboto-mono">
        {{ props.wallet.label }}
      </div>
      <FontAwesomeIcon :icon="['fal', 'lock']" class="text-base shrink-0 w-auto text-primary" />
    </div>

    <div class="w-full flex items-center justify-between space-x-2 px-3 py-1">
      <div class="flex items-center space-x-1">
        <UIcon name="ic:outline-shield" class="size-4" />
        <span class="text-sm">Backup</span>
      </div>
      <div class="flex items-center">
        <div class="font-semibold text-sm mr-2 text-gray-200">
          <span>2</span>
          <span class="font-light text-xs"> of </span>
          <span>3</span>
        </div>
        <FontAwesomeIcon
          :icon="['fal', 'key-skeleton-left-right']"
          class="text-info shrink-0 text-sm w-auto"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';

const props = defineProps<{
  wallet: any;
  isSelected: boolean;
  isLast: boolean;
}>();
</script>
