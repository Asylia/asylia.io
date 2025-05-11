<template>
  <Suspense>
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
        <MultisigSchema />
      </template>

      <UContainer>
        <TeamSection />
        <client-only>
          <ContactAndSupport />
        </client-only>
        <FooterSection />
      </UContainer>
    </UApp>

    <template #fallback>
      <div class="w-screen h-screen flex items-center justify-center">
        <Logo class="w-auto max-h-[20vh] text-slate-700 dark:text-primary" />
        <h1 class="text-3xl md:text-6xl text-primary dark:text-gray-300 font-bold">Asylia.io</h1>
        <p class="mt-1 text-xs sm:text-sm italic text-slate-800 dark:text-gray-400">
          “Arx, Imperium, Ostium” – {{ $t('arx_imperium_ostium') }}
        </p>
        <!--  afe list - because of broken nuxt/ui with tailwind4 -->
        <div
          style="display: none"
          class="row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6 row-span-7"
        />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Logo from '~/components/images/logo/AppLogo.vue';
import ContactAndSupport from '~/components/ContactAndSupport.vue';
import AppHeader from '~/components/AppHeader.vue';

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
