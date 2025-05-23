<template>
  <div
    class="flex px-4 py-2 items-center shrink bg-dark-secondary justify-start space-x-4 rounded-md"
  >
    <Logo class="text-primary h-[44px] shrink-0 w-auto" />
    <div class="flex w-full flex-col">
      <div class="text-2xl font-roboto-flex font-bold text-left text-gray-100">Asylia.io</div>
      <div class="w-full text-right">
        <p class="text-sm italic text-gray-200 font-roboto-flex">- Immutable security</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from '@shared/images/logo/AppLogo.vue';
</script>
