<template>
  <div id="cursor-glow" class="fixed inset-0 pointer-events-none z-40"/>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

onMounted(() => {
  const glow = document.getElementById('cursor-glow')!;
  if (!glow) return;

  const onMouseMove = ({ clientX: x, clientY: y }: MouseEvent) => {
    // const color = 'rgba(250,204,21,0.15)'
    const color = colorMode.value === 'dark' ? 'rgba(250,204,21,0.15)' : 'rgba(29,41,61,0.15)';
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${color}, transparent 300px)`;
  };

  const onMouseLeave = (e: MouseEvent) => {
    if (e.relatedTarget) return;
    glow.style.background = 'none';
  };

  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseout', onMouseLeave);

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseout', onMouseLeave);
  });
});
</script>

<style>
#cursor-glow {
  transition: background 0.21s ease;
}
</style>
