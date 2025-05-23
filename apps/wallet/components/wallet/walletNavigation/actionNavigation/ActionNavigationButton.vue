<template>
  <div
    class="flex-1 ratio flex flex-col group space-y-1 text-center py-2 items-center justify-center bg-dark-secondary transition-colors duration-100"
    :class="{
      'border-x border-white/10': props.dividerX,
    }"
  >
    <FontAwesomeIcon :icon="props.icon" class="text-primary text-base" />
    <div class="text-sm text-gray-100 group-hover:text-gray-300">
      {{ props.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon, {
  type IconType,
} from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';

const props = withDefaults(
  defineProps<{
    icon: IconType;
    title: string;
    dividerX?: boolean;
  }>(),
  {
    dividerX: false,
  },
);
</script>

<style scoped>
:hover {
  background-color: var(--color-dark);
}
</style>
