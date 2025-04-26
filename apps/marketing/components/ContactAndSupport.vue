<template>
  <div id="support" class="grid w-full mt-40 lg:grid-cols-[240px_1fr] gap-2 lg:gap-8">
    <div />

    <AnimationWrapper class="w-full flex flex-col min-w-0">
      <h2
        class="text-2xl break-words text-center md:text-left font-bold text-slate-800 dark:text-white md:text-4xl"
      >
        {{ $t('support.thanks') }}
      </h2>

      <blockquote
        class="border-l-4 mx-auto md:ml-0 mt-5 border-primary pl-4 italic my-4 text-slate-800 dark:text-gray-300"
        v-html="$t('support.q')"
      />

      <EmailForm class="mt-5" />
      <hr class="border-gray-300 dark:border-gray-700" />
      <SupportBanner />
    </AnimationWrapper>
  </div>
</template>

<script setup lang="ts">
import EmailForm from '~/components/EmailForm.vue';
import SupportBanner from '~/components/SupportBanner.vue';
import AnimationWrapper from '~/components/AnimationWrapper.vue';
</script>
