<template>
  <div class="flex flex-col items-center justify-center">
    <SingleButton :icon="['fas', 'plus']" :disabled="addDisabled" @click="add" />
    <div class="text-4xl select-none py-2">
      {{ value }}
    </div>
    <div class="text-xs text-gray-200 font-light select-none">
      {{ props.title }}
    </div>
    <SingleButton :icon="['fas', 'minus']" :disabled="minDisabled" class="mt-3" @click="subtract" />
  </div>
</template>

<script setup lang="ts">
import SingleButton from '~/components/multisigSchema/sidebar/numVerticalCounter/VerticalCounterButton.vue';

const props = defineProps<{
  title: string;
  min: number;
  max: number;
}>();

const value = defineModel<number>();

const addDisabled = computed(() => value.value >= props.max);
const minDisabled = computed(() => value.value <= props.min);

const add = () => {
  if (value.value < props.max) value.value++;
};
const subtract = () => {
  if (value.value > props.min) value.value--;
};
</script>
