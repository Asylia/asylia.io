<template>
  <div
    :style="{ width: progress + '%' }"
    class="fixed bottom-0 left-0 h-[2px] bg-gradient-to-r from-slate-500 to-slate-900 dark:from-primary-100 dark:to-primary-500 overflow-visible transition-[width] duration-100 ease-out z-50"
  >
    <div
      class="absolute right-[-6px] top-[-2px] h-[calc(100%+4px)] w-[12px] bg-[radial-gradient(circle_at_center,rgba(29,41,61,0.8)_0%,rgba(29,41,61,0)_30%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_70%)] pointer-events-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);

function updateProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
}

onMounted(() => {
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress);
});
</script>
