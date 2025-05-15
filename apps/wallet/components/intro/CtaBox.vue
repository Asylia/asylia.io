<template>
<div
  class="w-[240px] h-[230px] rounded-lg   border-slate-800 flex flex-col items-center justify-center border hover:cursor-pointer hover:border-primary transition-all duration-200 hover:shadow-lg"
>
<span class="text-2xl text-center">
      <slot />
    </span>
<font-awesome :icon="props.icon" class="text-primary text-4xl mt-4" />
</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string[];
}>();
</script>

<style scoped>
div {
  background: rgba(20, 30, 54, 0.2);
  backdrop-filter: blur(1px);
}
</style>
