<template>
  <UApp class="relative">
    <client-only>
      <CursorGlow />
      <ScrollToTop />
      <ScrollProgress />
    </client-only>

    <UContainer class="min-h-screen flex flex-col justify-between w-screen">
      <AppHeader :active-tab="activeTab" @update:tab="activeTab = $event" />
      <keep-alive>
        <client-only>
          <IntroSection v-if="isMainTab" />
        </client-only>
      </keep-alive>
      <LazyRoadMap v-if="!isMainTab" />
    </UContainer>

    <template v-if="isMainTab">
      <LazyWhitePaper />
      <MultisigSchemaSection />
    </template>

    <UContainer>
      <TeamSection />
      <client-only>
        <ContactAndSupport />
      </client-only>
      <FooterSection />
    </UContainer>
  </UApp>
</template>

<script setup lang="ts">
import Logo from '@shared/images/logo/AppLogo.vue';
import ContactAndSupport from '~/components/ContactAndSupport.vue';
import AppHeader from '~/components/AppHeader.vue';
import MultisigSchemaSection from '~/components/MultisigSchemaSection.vue';
import CursorGlow from '@shared/components/ui/CursorGlow.vue';

const { t, locale } = useI18n();
const MAIN_TAB = 'white-paper';
const activeTab = ref(MAIN_TAB);
const isMainTab = computed(() => activeTab.value === MAIN_TAB);

useHead({ htmlAttrs: { lang: locale } });
useSeoMeta({
  title: t('seo.title'),
  description: t('seo.description'),
  ogSiteName: 'Asylia.io',
  ogTitle: t('seo.title'),
  ogDescription: t('seo.description'),
  ogType: 'website',
  ogImage: '/images/seo/og-image.png',
});
</script>
