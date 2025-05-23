<template>
  <div
    class="w-[240px] h-[230px] rounded-lg border-slate-800 bg-dark-secondary flex flex-col items-center justify-center border hover:cursor-pointer hover:border-primary transition-all duration-200 hover:shadow-lg"
  >
    <span class="text-2xl text-center text-gray-100">
      <slot />
    </span>
    <FontAwesomeIcon :icon="props.icon" class="text-primary text-4xl mt-4" />
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon, {type IconType} from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';

const props = defineProps<{
  icon: IconType
}>();
</script>
