<template>
  <div
    class="flex flex-col"
    :class="{
      'w-[280px]': is2of3,
      'w-[310px] md:-w[380px]': is3of5,
    }"
  >
    <div
      class="w-full flex h-[40px] border-l-3 border-t-3 border-r-3 rounded-tl-[20rem] rounded-tr-[20rem]"
    >
      <div class="flex-1 border-r"/>
      <div class="flex-1 border-r"/>
      <template v-if="is3of5">
        <div class="flex-1 border-r"/>
        <div class="flex-1 border-r"/>
      </template>
      <div class="flex-1"/>
    </div>

    <div class="w-full flex h-[10px] border-l-3 border-r-3">
      <div class="flex-1 border-r"/>
      <div class="flex-1 border-r"/>
      <template v-if="is3of5">
        <div class="flex-1 border-r"/>
        <div class="flex-1 border-r"/>
      </template>
      <div class="flex-1"/>
    </div>
    <div class="w-full h-[100px] border-3 rounded-b-lg flex relative">
      <div v-for="key in n" :key="key" class="flex-1 relative">
        <div
          class="w-[10px] h-[20px] border-l-3 border-r-3 border-b-3 z-20 bg-slate-900 rounded-b-full absolute mx-auto left-0 right-0 top-0"
        />
        <font-awesome
          :icon="['fal', 'lock-keyhole']"
          style="z-index: 1"
          class="text-slate-500 dark:text-gray-300 text-5xl mx-auto absolute left-0 right-0 top-[10px]"
        />
      </div>
    </div>

    <div class="w-full mt-3 flex px-4">
      <div v-for="key in n" :key="key" class="flex-1 flex items-center justify-center px-2">
        <font-awesome :icon="['fas', 'key']" class="text-base text-primary" />
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: '2of3' | '3of5';
}>();

const is2of3 = computed(() => props.type === '2of3');
const is3of5 = computed(() => props.type === '3of5');
const n = computed(() => {
  if (props.type === '2of3') return 3;
  else if (props.type === '3of5') return 5;
  return 0;
});
</script>
