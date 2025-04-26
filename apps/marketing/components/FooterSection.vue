<template>
  <div class="w-full z-100 mt-21">
    <div class="grid lg:grid-cols-[240px_1fr] gap-2 lg:gap-8 z-20">
      <div class="flex items-center justify-center md:justify-start !w-full md:!w-auto">
        <GitStatus />
      </div>
      <div class="flex items-center justify-between mt-8 md:mt-0">
        <SocialLinks />
        <div class="w-full flex items-center justify-end">
          <div
            class="flex flex-col pr-4 text-slate-800 dark:text-gray-300 border-r-4 border-primary z-20"
          >
            <div>{{ $t('footer.cz.p1') }}</div>
            <div class="flex items-center justify-end space-x-1">
              <span>{{ $t('footer.cz.p2') }}</span>
              <UIcon name="flagpack:cz" class="size-3 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="block md:flex items-center justify-between w-full mt-5 pt-4 pb-4.5 border-t border-gray-300 dark:border-gray-700"
    >
      <div class="flex space-x-3 items-center mt-2 md:mt-0 justify-center md:justify-start">
        <SelectLanguage />
        <ColorModeButton />
      </div>

      <div
        class="text-sm md:flex pb-3 md:pb-0 justify-end md:justify-center items-center space-x-2 text-slate-800 dark:text-gray-300"
      >
        <div class="flex items-center justify-center mt-5 md:mt-0 md:mr-2">
          <span>{{ $t('footer.motto') }}</span>
          <span>-</span>
          <EmailLink :dash="false" :has-copy-button="false" />
        </div>
        <span class="hidden md:inline">-</span>
        <span class="block text-center md:inline mt-3 md:mt-0">&copy; 2025 Asylia.io</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SocialLinks from '~/components/SocialLinks.vue';
import SelectLanguage from '~/components/SelectLanguage.vue';
import ColorModeButton from '~/components/ColorModeButton.vue';
import EmailLink from '~/components/EmailLink.vue';
import GitStatus from '~/components/GitStatus.vue';
</script>
