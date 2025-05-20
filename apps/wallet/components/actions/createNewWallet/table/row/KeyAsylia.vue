<template>
  <div class="w-full flex">
    <div
      class="px-2 flex-1 py-2 border-t border-r border-white/10"
      :class="{
        'border-b': props.isLast,
      }"
    >
      <div class="flex items-center space-x-2 grow">
        <FontAwesomeIcon :icon="['fas', 'key']" class="text-info text-base" />
        <div class="font-semibold">
          <span>Backup Key </span>
          <span class="font-light">{{ props.index + 1 }}</span>
        </div>
      </div>
      <div class="pl-6 pr-2 text-xs text-left text-secondary-400">
        You can sign by exported backup.
      </div>
    </div>

    <UTooltip text="Backup key (export available later)" arrow :content="{ side: 'top' }">
      <div
        class="flex justify-center border-t border-r border-white/10 items-center space-x-4 flex-1"
        :class="{
          'border-b rounded-br-md': props.isLast,
        }"
      >
        <FontAwesomeIcon
          :icon="['fas', 'signature-lock']"
          class="text-3xl"
          :class="props.allKeysSelected ? 'text-primary' : 'text-gray-300'"
        />
        <div
          v-if="props.allKeysSelected"
          class="text-xs text-center px-1 text-gray-300 font-semibold"
        >
          Key Export <br />
          (.zip, .txt, .json)
        </div>
      </div>
    </UTooltip>

    <div class="w-[120px] shrink-0 h-full"></div>
  </div>
</template>

<script setup lang="ts">
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';

const props = withDefaults(
  defineProps<{
    index: number;
    isLast?: boolean;
    allKeysSelected: boolean;
  }>(),
  {
    isLast: false,
  },
);

const borderB = computed(() => props);
</script>
