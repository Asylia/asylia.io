<template>
  <div class="w-full bg-dark-secondary"  :class="{
        'hover:cursor-pointer transition-opacity duration-100 hover:opacity-70': !hasSlot,
      }">
    <div
      class="flex items-center  justify-between py-2 px-6"

    >
      <div class="flex items-center group space-x-2">
        <FontAwesomeIcon :icon="props.icon" class="text-primary text-base" />
        <div
          class="text-base text-gray-100"
          :class="{
            'group-hover:text-gray-300': !hasSlot,
          }"
        >
          {{ props.title }}
        </div>
      </div>
      <slot />
    </div>
    <hr v-if="props.divider" class="border-t border-white/5" />
  </div>
</template>
<script setup lang="ts">
import FontAwesomeIcon, {
  type IconType,
} from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';

const props = withDefaults(
  defineProps<{
    title: string;
    icon: IconType;
    divider?: boolean;
  }>(),
  {
    divider: false,
  },
);

const useSlot = useSlots();
const hasSlot = computed(() => {
  return Object.keys(useSlot).length > 0;
});
</script>
