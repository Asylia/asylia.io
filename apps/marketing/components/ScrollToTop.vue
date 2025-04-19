<template>
  <div @click="emit('click')"
       class="fixed z-20 right-6 bottom-6 h-8 w-8 flex items-center justify-center bg-primary text-slate-700 rounded-lg hover:cursor-pointer hover:text-white">
    <font-awesome :icon="['fal','arrow-up']"/>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>