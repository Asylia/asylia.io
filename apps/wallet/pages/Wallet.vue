<template>
  <div class="w-screen flex h-screen">
    <div class="w-72 flex flex-col h-full px-5 pt-5">
      <div
        class="flex px-4 py-4 items-center shrink justify-start space-x-4 rounded-md bg-[#232d4d] border border-white/5"
      >
        <Logo class="text-primary h-[44px] shrink-0 w-auto" />
        <div class="flex w-full flex-col">
          <div class="text-xl font-roboto-flex font-bold text-left text-gray-100">Asylia.io</div>
          <div class="w-full text-right">
            <p class="text-xs italic text-gray-200 font-roboto-flex">
              - Immutable security by design
            </p>
          </div>
        </div>
      </div>

      <div
        style=""
        class="flex flex-1 flex-col mt-3 items-start w-full justify-start space-x-4 rounded-md bg-[#232d4d] border border-white/5"
      >
        <div class="w-full px-4 py-2">
          <div class="flex items-center justify-start space-x-4">
            <FontAwesomeIcon
              :icon="['fal', 'wallet']"
              class="text-primary text-lg shrink-0 w-auto"
            />
            <span class="text-lg font-roboto-mono">Wallets</span>
          </div>
        </div>
        <hr class="border-t border-white/5 w-full" />

        <div class="w-full mt-2 px-3">
          <div class="w-full mt-2 border border-white/10 rounded-md py-1">
            <div class="flex py-1 items-center justify-between px-3">
              <div class="text-base font-semibold text-btc font-roboto-mono">Wallet 1</div>
              <FontAwesomeIcon
                :icon="['fas', 'lock']"
                class="text-lg shrink-0 w-auto"
                :class="{
                  'text-success': false,
                  'text-primary': true,
                }"
              />
            </div>
            <hr class="border-t my-1 border-white/5 w-full" />
            <div class="w-full mt-2 flex items-center justify-between space-x-2 px-3 py-1">
              <div class="flex items-center space-x-1">
                <UIcon name="ic:outline-shield" class="size-4" />
                <span class="text-sm">Backup</span>
              </div>
              <div class="flex items-center">
                <div class="font-semibold text-sm mr-2 text-gray-300">
                  <span>2</span>
                  <span class="font-light"> of </span>
                  <span>3</span>
                </div>
                <FontAwesomeIcon
                  :icon="['fal', 'key-skeleton-left-right']"
                  class="text-info shrink-0 text-sm w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-2 shrink-0 py-4 text-center text-white font-light font-roboto-mono text-xs">
        Copyright © 2025  - MIT License
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@shared/images/logo/AppLogo.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
</script>

<style lang="css" scoped></style>
