<template>
  <UContainer class="mx-auto flex flex-col h-screen items-center justify-center">
    <div class="max-w-lg w-full mx-auto">
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

      <div class="w-full flex items-center justify-between">
        <GitStatus git-commit-hash="0afa9c0" />
      </div>
    </div>

    <div class="w-full border-t mt-5 border-gray-700"></div>
  </UContainer>
</template>

<script setup lang="ts">
import Logo from '@shared/images/logo/AppLogo.vue';
import AuthBox from '~/components/authBox/AuthBox.vue';
import GitStatus from '@shared/components/GitStatus.vue';
</script>
