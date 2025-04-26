<template>
  <div ref="el" class="zoom-container">
    <div class="zoom-content" :class="{ 'zoom-animated': isActive }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

const el = ref<HTMLElement | null>(null);
const isActive = ref(false);
let observer: IntersectionObserver | null = null;

// Manuálna implementácia IntersectionObserver pre väčšiu kontrolu
onMounted(() => {
  // Nastavenie počiatočného stavu na false
  isActive.value = false;

  // Počkáme krátku chvíľu pre istotu, že DOM je vykreslený
  setTimeout(() => {
    if (!el.value) return;

    // Vytvoríme vlastnú inštanciu IntersectionObserver
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Ak element vchádza do viewportu
          if (entry.isIntersecting) {
            isActive.value = true;
          } else {
            // Ak element opúšťa viewport, resetujeme ho pre ďalšiu animáciu
            isActive.value = false;
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px',
      },
    );

    // Začneme sledovať náš element
    observer.observe(el.value);

    // Explicitne skontrolujeme viditeľnosť - pre elementy viditeľné pri načítaní
    checkInitialVisibility();
  }, 200);
});

// Funkcia na kontrolu počiatočnej viditeľnosti
const checkInitialVisibility = () => {
  if (!el.value) return;

  const rect = el.value.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // Ak je element v počiatočnom viewporte
  if (rect.top < windowHeight && rect.bottom > 0) {
    // Krátka pauza pred aktiváciou, aby sa animácia spustila po zobrazení stránky
    setTimeout(() => {
      isActive.value = true;
    }, 300);
  }
};

// Čistenie pri odchode
onBeforeUnmount(() => {
  if (observer && el.value) {
    observer.unobserve(el.value);
    observer.disconnect();
  }
});
</script>

<style scoped>
.zoom-container {
  height: auto !important;
  overflow: visible !important;
  position: relative;
}

.zoom-content {
  transform-origin: center;
  width: 100%;
  opacity: 0;
  transform: scale(0.95);
  transition: none;
}

.zoom-animated {
  animation: zoomIn 0.6s ease forwards;
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
