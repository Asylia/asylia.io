<template>
  <UApp class="relative">

    <CursorGlow/>
    <ScrollToTop v-if="!isAtTop" @click="scrollToTop"/>

    <UContainer class="min-h-screen flex flex-col justify-between w-screen">
      <Header :activeTab="activeTab" @update:tab="activeTab = $event"/>
      <keep-alive>
        <IntroSection v-if="isMainTab"/>
      </keep-alive>
      <RoadmapSection v-if="!isMainTab"/>
    </UContainer>

    <WhitePaperSection v-if="isMainTab"/>

    <UContainer>
      <TeamSection/>
      <client-only>
        <EmailForm class="mt-12"/>
        <SupportBanner class="mt-14"/>
      </client-only>
      <FooterSection/>
    </UContainer>

  </UApp>
</template>

<script setup lang="ts">
import ScrollToTop from '~/components/ScrollToTop.vue';
import CursorGlow from '~/components/CursorGlow.vue';
import RoadmapSection from '~/components/RoadMap.vue';
import WhitePaperSection from '~/components/WhitePaper.vue';
import EmailForm from '~/components/EmailForm.vue';
import SupportBanner from '~/components/SupportBanner.vue';
import FooterSection from '~/components/FooterSection.vue';
import {useScrollPosition} from '~/composables/useScrollPosition';

const {t} = useI18n();
const MAIN_TAB = 'white-paper';
const activeTab = ref(MAIN_TAB);
const isMainTab = computed(() => activeTab.value === MAIN_TAB);

const {isAtTop, scrollToTop} = useScrollPosition(60);

useSeoMeta({
  title: t('seo.title'),
  description: t('seo.description'),
  ogSiteName: 'Asylia.io',
  ogTitle: t('seo.title'),
  ogDescription: t('seo.description'),
  ogType: 'website',
  ogImage: '/images/seo/og-image.png',
})

</script>