<template>
  <section
    class="mt-4 sm:mt-8 md:mt-12 pb-4 md:pb-8 flex-grow flex flex-col justify-between container mx-auto px-2 md:px-0 space-y-6"
  >
    <Transition name="slide-up-down">
      <TowerImage
        v-if="isAsTop2"
        class="fixed right-[-32px] bottom-[-32px] max-h-[70vh] opacity-4 text-slate-900 dark:text-white"
      />
    </Transition>

    <div
      class="master-intro z-10 text-2xl sm:text-4xl md:text-5xl text-center md:text-left leading-snug text-slate-500 dark:text-gray-400"
      v-html="displayedHtml"
    />

    <div
      class="p-4 transition-opacity duration-200 border-l-4 border-primary italic text-sm md:text-lg text-slate-600 dark:text-gray-300"
      :class="{ 'opacity-0': !textTyped }"
    >
      &ldquo;{{ $t('your_keys_your_kingdom') }}&rdquo; <br >
      – {{ $t('immortal_legacy') }}
    </div>

    <div
      :class="{ 'opacity-0': !isAtTop }"
      class="pb-0 md:pb-8 flex justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 flex-col md:flex-row items-center transition-opacity duration-200"
    >
      <SocialLinks />

      <div
        class="text-center transition-opacity duration-200 text-slate-600 font-semibold dark:text-primary-500 flex space-x-2 justify-center items-center group hover:cursor-pointer order-last md:order-none mt-7 md:mt-0"
        @click="scrollToWhitePaper"
      >
        <span class="opacity-75 group-hover:opacity-100">
          {{ $t('read_white_paper') }}
        </span>
        <font-awesome
          :icon="['fal', 'computer-mouse-scrollwheel']"
          class="opacity-50 dark:text-primary animate-bounce-slow"
        />
      </div>

      <SelectLanguage />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useScrollPosition } from '~/composables/useScrollPosition';
import SocialLinks from '~/components/SocialLinks.vue';
import SelectLanguage from '@shared/components/SelectLanguage.vue';
import TowerImage from '@shared/images/TowerImage.vue';

const { t, locale } = useI18n();
const introText = computed(() => t('introMessage'));

const textTyped = ref(false);
const displayedHtml = ref('');
const { isAtTop } = useScrollPosition(60);
const { isAtTop: isAsTop2 } = useScrollPosition(window?.innerHeight / 2);

function typeEffect() {
  const fullHtml = introText.value;
  let i = 0;
  const speed = 7.3; // ms per character
  let currentHtml = '';

  function typeHtml() {
    if (i >= fullHtml.length) {
      textTyped.value = true;
      return;
    }

    if (fullHtml[i] === '<') {
      const endTag = fullHtml.indexOf('>', i);
      if (endTag !== -1) {
        currentHtml += fullHtml.slice(i, endTag + 1);
        i = endTag + 1;
      }
    } else {
      currentHtml += fullHtml[i];
      i++;
    }

    displayedHtml.value = currentHtml;
    setTimeout(typeHtml, speed);
  }

  typeHtml();
}

watch(locale, typeEffect);
onMounted(typeEffect);

function scrollToWhitePaper() {
  document.getElementById('white-paper-start')?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style scoped>
.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: transform 0.4s ease-in-out;
}

.slide-up-down-enter-from {
  transform: translateY(100%);
}

.slide-up-down-enter-to {
  transform: translateY(0);
}

.slide-up-down-leave-from {
  transform: translateY(0);
}

.slide-up-down-leave-to {
  transform: translateY(100%);
}
</style>
