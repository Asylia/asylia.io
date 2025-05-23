<template>
  <div class="w-screen flex items-start h-screen px-5 pt-5">
    <AppNavigation />

    <div class="flex-1 flex-col pl-8">
      <div class="w-[380px] bg-dark-secondary rounded-md">
        <div class="flex items-center justify-between px-7 pt-3 pb-1">
          <div class="flex items-center space-x-4">
            <BitcoinIcon class="h-5 w-auto" />
            <div class="text-btc font-roboto-mono text-2xl font-semibold">Wallet 1</div>
          </div>
          <FontAwesomeIcon :icon="['fal', 'wallet']" class="text-2xl shrink-0 text-primary" />
        </div>

        <hr class="border-t border-white/5 mt-2" />

        <div class="flex items-center w-full">
          <!--        <div class="flex items-center justify-evenly">-->

          <div class="flex items-center justify-center space-x-1 flex-1 py-2 px-2">
            <UIcon name="ic:outline-shield" class="size-4 text-primary" />
            <span class="font-roboto-mono text-sm text-gray-300">Backup</span>
          </div>

          <div
            class="text-base font-roboto-mono flex items-center py-2 px-2 justify-center space-x-2 flex-1 border-x border-white/5"
          >
            <FontAwesomeIcon
              :icon="['fal', 'key-skeleton-left-right']"
              class="text-info shrink-0 text-sm w-auto"
            />
            <span class="text-sm text-gray-300">2of3</span>
          </div>

          <div class="text-base flex items-center justify-center py-2 px-2 space-x-1 flex-1">
            <FontAwesomeIcon :icon="['fal', 'sliders']" class="text-warning text-sm" />
            <span class="font-roboto-mono text-sm text-gray-300">P2WSH</span>
          </div>
        </div>
      </div>

      <div class="w-[380px] flex flex-col mt-5 bg-dark-secondary rounded-md px-7 py-4">
        <div class="flex items-start justify-between">
          <div class="text-xl font-semibold font-roboto-mono text-primary">Total:</div>
          <div class="flex flex-col items-end">
            <div class="font-roboto-mono text-xl space-x-1 text-gray-200">
              <span class="font-semibold">0.00011234</span>
              <span class="text-sm">BTC</span>
            </div>
            <div class="font-roboto-mono text-xl space-x-1 text-gray-200">
              <span class="">238</span>
              <span class="text-sm">CZK</span>
            </div>
          </div>
        </div>

        <hr class="my-3 border-t border-white/5" />

        <div class="flex items-start justify-between text-gray-100">
          <div class="text-base font-roboto-mono">Spendable:</div>
          <div class="flex flex-col items-end">
            <div class="font-roboto-mono text-base space-x-1">
              <span class="">0.00000000</span>
              <span class="text-sm">BTC</span>
            </div>
            <div class="font-roboto-mono text-base space-x-1">
              <span class="">0</span>
              <span class="text-sm">CZK</span>
            </div>
          </div>
        </div>

        <div class="flex items-start justify-between mt-1 text-gray-100">
          <div class="text-base font-roboto-mono">Incoming:</div>
          <div class="flex flex-col items-end">
            <div class="font-roboto-mono text-base space-x-1">
              <span class="">0.00000000</span>
              <span class="text-sm">BTC</span>
            </div>
            <div class="font-roboto-mono text-base space-x-1">
              <span class="">0</span>
              <span class="text-sm">CZK</span>
            </div>
          </div>
        </div>

        <div class="flex items-start justify-between mt-1 text-gray-100">
          <div class="text-base font-roboto-mono">Unsend (PSBT):</div>
          <div class="flex flex-col items-end">
            <div class="font-roboto-mono text-base space-x-1">
              <span class="">0.00000000</span>
              <span class="text-sm">BTC</span>
            </div>
            <div class="font-roboto-mono text-base space-x-1">
              <span class="">0</span>
              <span class="text-sm">CZK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@shared/images/logo/AppLogo.vue';
import MenuSection from '~/components/layout/navigation/mainNavigation/MenuSection.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import ActionNavigationButton from '~/components/layout/navigation/actionNavigation/ActionNavigationButton.vue';
import GitStatus from '@shared/components/marketing/GitStatus.vue';
import ColorModeButton from '@shared/components/ui/ColorModeButton.vue';
import SelectLanguage from '@shared/components/ui/SelectLanguage.vue';
import SmallMenuLink from '~/components/layout/navigation/smallNavigation/SmallMenuLink.vue';
import NavigationHeader from '~/components/layout/navigation/NavigationHeader.vue';
import AppNavigation from '~/components/layout/navigation/AppNavigation.vue';
import BitcoinIcon from '@shared/images/icons/BitcoinIcon.vue';
</script>
