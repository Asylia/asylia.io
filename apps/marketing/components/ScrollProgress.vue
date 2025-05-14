<template>
  <teleport to="body">
    <div
      :style="progressBarStyle"
      class="fixed bottom-0 left-0 h-[2px] overflow-visible transition-[width] duration-100 ease-out z-50"
    >
      <div
        class="absolute right-[-6px] top-[-2px] h-[calc(100%+4px)] w-[12px] pointer-events-none"
        :style="glowStyle"
      />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import appColorMode from '@shared/composuables/ui/colorMode';

const { isDark } = appColorMode();
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

const progressBarStyle = computed(() => {
  const from = 'var(--color-primary-100)';
  const to = 'var(--color-primary-500)';
  return {
    width: `${progress.value}%`,
    background: `linear-gradient(to right, ${from}, ${to})`,
  };
});

const glowStyle = computed(() => {
  const color = isDark.value ? '255,255,255' : '29,41,61';
  const alpha = isDark.value ? 0.8 : 0.8;
  return {
    background: `radial-gradient(circle at center, rgba(${color},${alpha}) 0%, rgba(${color},0) 70%)`,
  };
});
</script>
