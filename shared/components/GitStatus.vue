<template>
  <div
    v-if="hasGitCommitHash"
    class="flex items-center text-slate-600 hover:cursor-pointer border-gray-300 bg-white dark:bg-slate-900 group border dark:border-slate-700 dark:text-gray-300 px-4 py-1 rounded-full space-x-2"
    @click="openGitCommit"
  >
    <span class="bg-emerald-600 rounded-full w-3 h-3" />
    <span class="text-sm group-hover:text-slate-800 dark:group-hover:text-white">
      {{ gitCommitHash }}
    </span>
    <font-awesome
      :icon="['fab', 'github']"
      class="text-sm group-hover:text-slate-800 dark:group-hover:text-white"
    />
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  gitCommitHash?: string;
}>();

const hasGitCommitHash = props.gitCommitHash.toString().length > 0;

const openGitCommit = () => {
  window.open('https://github.com/Asylia/asylia.io/commit/' + props.gitCommitHash, '_blank');
};
</script>
