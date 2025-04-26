<template>
  <AnimationWrapper :id="props.id" class="pt-8 lg:pt-12 section-observe">
    <h2
      class="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4"
      v-html="props.title"
    />

    <slot />
  </AnimationWrapper>
</template>

<script setup lang="ts">
import AnimationWrapper from '~/components/AnimationWrapper.vue';

import { useMotion } from '@vueuse/motion';

const props = defineProps<{
  title: string;
  id: string;
}>();

const el = ref(null);
const { stop } = useMotion(el, {
  initial: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 300,
      onComplete: () => stop(),
    },
  },
});
</script>
