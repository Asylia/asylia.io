<template>
  <section
      class="mt-12 pb-8 flex-grow flex flex-col justify-between
           container mx-auto px-2 sm:px-6 lg:px-8
           space-y-6"
  >
    <div
        class="master-intro text-2xl sm:text-4xl md:text-5xl text-center md:text-left leading-snug text-slate-500 dark:text-gray-400"
        v-html="displayedHtml"
    />

    <div
        class="p-4 transition-opacity duration-200 border-l-4 border-yellow-600 italic text-sm md:text-lg text-slate-600 dark:text-gray-300"
        :class="{ 'opacity-0': !textTyped }"
    >
      &ldquo;{{ $t('your_keys_your_kingdom') }}&rdquo; <br/>
      – {{ $t('immortal_legacy') }}
    </div>

    <div :class="[
        'transition-opacity duration-200',
        !isAtTop ? 'opacity-0' : '',
        'flex flex-col md:flex-row items-center',
        'space-y-4 md:space-y-0 md:space-x-4',
        'justify-center md:justify-between'
      ]"
         class="pb-8"
    >
      <div class=" space-x-4 flex items-center ">
        <UTooltip text="Open on GitHub" arrow :content="{side:'top'}">
          <font-awesome @click="openGithub"
                        :icon="['fab', 'github']"
                        class="dark:text-gray-300 text-xl hover:cursor-pointer hover:text-primary"/>
        </UTooltip>
        <UTooltip text="Open on X" arrow :content="{side:'top'}">
          <font-awesome @click="openX"
                        :icon="['fab', 'x-twitter']"
                        class="dark:text-gray-300 text-xl hover:cursor-pointer hover:text-primary"/>
        </UTooltip>
        <UTooltip text="Open on medium" arrow :content="{side:'top'}">
          <font-awesome @click="openMedium"
                        :icon="['fab', 'medium']"
                        class="dark:text-gray-300 text-xl hover:cursor-pointer hover:text-primary"/>
        </UTooltip>
      </div>

      <div @click="scrollToWhitePaper"
           class="text-center transition-opacity duration-200
               text-yellow-500 flex space-x-2 justify-center items-center
               group hover:cursor-pointer"
      >
        <span class="opacity-75 group-hover:opacity-100">
          {{ $t('read_white_paper') }}
        </span>
        <font-awesome
            :icon="['fal', 'computer-mouse-scrollwheel']"
            class="opacity-50 animate-bounce-slow"
        />
      </div>

      <PageSettings/>

    </div>
  </section>
</template>
<script setup lang="ts">
import {useScrollPosition} from '~/composables/useScrollPosition';
import PageSettings from '~/components/PageSettings.vue'

const {t, locale} = useI18n();
const introText = computed(() => t('introMessage'))

const textTyped = ref(false);
const displayedHtml = ref('');
const {isAtTop} = useScrollPosition(60);

function typeEffect() {
  const fullHtml = introText.value
  let i = 0
  const speed = 12 // ms per character
  let currentHtml = ''

  function typeHtml() {
    if (i >= fullHtml.length) {
      textTyped.value = true;
      return
    }

    if (fullHtml[i] === '<') {
      const endTag = fullHtml.indexOf('>', i)
      if (endTag !== -1) {
        currentHtml += fullHtml.slice(i, endTag + 1)
        i = endTag + 1
      }
    } else {
      currentHtml += fullHtml[i]
      i++
    }

    displayedHtml.value = currentHtml
    setTimeout(typeHtml, speed)
  }

  typeHtml()
}

watch(locale, typeEffect)
onMounted(typeEffect)

function scrollToWhitePaper() {
  document.getElementById('white-paper-start')?.scrollIntoView({behavior: 'smooth'});
}

// social
const openGithub = () => {
  window.open('https://github.com/Asylia', '_blank')
}

const openX = () => {
  window.open('https://github.com/Asylia', '_blank')
}

const openMedium = () => {
  window.open('https://github.com/Asylia', '_blank')
}
</script>