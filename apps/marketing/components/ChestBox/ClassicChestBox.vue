<template>
  <div class="flex w-[200px] flex-col">
    <div
      class="w-full flex h-[40px] border-l-3 border-t-3 border-r-3 rounded-tl-[20rem] rounded-tr-[20rem]"
    />
    <div class="w-full h-[10px] border-l-3 border-r-3"/>
    <div class="w-full h-[100px] border-3 rounded-b-lg relative flex">
      <div v-for="key in props.keys" :key="key" class="flex-1 relative">
        <div
          class="w-[10px] h-[20px] border-l-3 border-r-3 border-b-3 z-20 bg-slate-900 rounded-b-full absolute mx-auto left-0 right-0 top-0"
        />
        <FontAwesomeIcon
          :icon="['fal', 'lock-keyhole']"
          style="z-index: 1"
          class="text-slate-500 dark:text-gray-300 text-5xl mx-auto absolute left-0 right-0 top-[10px]"
        />
      </div>
    </div>

    <div class="w-full mt-3 flex">
      <div
        v-for="key in props.keys"
        :key="key"
        class="flex-1 flex items-center justify-center px-2"
      >
        <FontAwesomeIcon :icon="['fas', 'key']" class="text-base text-primary" />
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';

const props = withDefaults(
  defineProps<{
    keys?: number;
  }>(),
  {
    keys: 1,
  },
);
</script>
