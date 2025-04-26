<template>
  <div
    v-if="!isAtTop"
    class="fixed z-20 right-6 bottom-6 h-8 w-8 flex items-center justify-center bg-primary text-slate-700 rounded-sm hover:cursor-pointer hover:text-white"
    @click="scrollToTop"
  >
    <font-awesome :icon="['fal', 'arrow-up']" />
  </div>
</template>

<script setup lang="ts">
import { useScrollPosition } from '~/composables/useScrollPosition';

const { isAtTop, scrollToTop } = useScrollPosition(60);
</script>
