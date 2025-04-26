<template>
  <div class="space-x-4 flex items-center">
    <UTooltip text="Open on GitHub" arrow :content="{ side: 'top' }">
      <font-awesome
        :icon="['fab', 'github']"
        class="text-slate-400 text-xl hover:cursor-pointer hover:text-primary"
        @click="openGithub"
      />
    </UTooltip>
    <UTooltip text="Open on X" arrow :content="{ side: 'top' }">
      <font-awesome
        :icon="['fab', 'x-twitter']"
        class="text-slate-400 text-xl hover:cursor-pointer hover:text-primary"
        @click="openX"
      />
    </UTooltip>
    <UTooltip text="Open on medium" arrow :content="{ side: 'top' }">
      <font-awesome
        :icon="['fab', 'medium']"
        class="text-slate-400 text-xl hover:cursor-pointer hover:text-primary"
        @click="openMedium"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
const openGithub = () => {
  window.open('https://github.com/Asylia', '_blank');
};

const openX = () => {
  window.open('https://github.com/Asylia', '_blank');
};

const openMedium = () => {
  window.open('https://github.com/Asylia', '_blank');
};
</script>
