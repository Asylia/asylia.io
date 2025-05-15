<template>
  <UApp>
    <div class="mx-auto flex flex-col h-screen items-center justify-between">
      <!--    <TowerImage-->
      <!--      class="fixed right-0 z-0 bottom-[-32px] max-h-[70vh] opacity-4 text-slate-900 dark:text-white"-->
      <!--    />-->

      <div class="max-w-lg w-full z-20 mx-auto">
        <div class="flex space-x-4 bg-slate-850 p-5 rounded-md">
          <div class="">
            <Logo class="text-primary h-[68px]" />
          </div>
          <div class="w-full grow shrink">
            <h1 class="text-2xl md:text-4xl text-slate-700 dark:text-gray-200 font-bold">
              Asylia.io
            </h1>
            <p class="mt-1 text-xs sm:text-sm italic text-slate-800 dark:text-gray-300">
              &ldquo;Arx, Imperium, Ostium&rdquo; - Pevnosť, Moc, Brána
            </p>
          </div>
        </div>

        <div class="mt-5 bg-slate-850 p-5 rounded-md">
          <AuthBox />
        </div>
      </div>

      <div class="w-full max-w-lg mx-auto">
        <div class="w-full flex mt-4 items-center justify-between">
          <GitStatus git-commit-hash="0afa9c0" />
          <div class="flex space-x-2">
            <ColorModeButton />
            <SelectLanguage />
          </div>
        </div>
        <div class="mx-auto w-full border-t py-4 mt-4 flex items-center justify-between border-gray-700">
          <SocialLinks />
          <div class="text-center text-gray-300">Asylia.io &copy; 2025</div>
        </div>
      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import Logo from '@shared/images/logo/AppLogo.vue';
import AuthBox from '~/components/authBox/AuthBox.vue';
import GitStatus from '@shared/components/GitStatus.vue';
import ColorModeButton from '@shared/components/ColorModeButton.vue';
import SelectLanguage from '@shared/components/SelectLanguage.vue';
import TowerImage from '@shared/images/TowerImage.vue';
import SocialLinks from '@shared/components/SocialLinks.vue';
</script>
