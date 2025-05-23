<template>
  <div class="w-screen flex items-start h-screen px-5 pt-5">
    <AppNavigation />

    <div class="flex-1 flex-col pl-8">
      <div class="w-[380px] bg-dark-secondary rounded-md">
        <div class="flex items-center justify-between px-7 pt-2 pb-2">
          <div class="flex items-center space-x-4">
            <BitcoinIcon class="h-5 w-auto" />
            <div class="text-btc font-roboto-mono text-2xl font-semibold">Wallet 1</div>
          </div>
          <FontAwesomeIcon :icon="['fal', 'wallet']" class="text-2xl shrink-0 text-primary" />
        </div>

        <hr class="border-t border-white/10" />

        <div class="flex items-center w-full">
          <!--        <div class="flex items-center justify-evenly">-->

          <div class="flex items-center justify-center space-x-2 flex-1 py-2 px-2">
            <UIcon name="ic:outline-shield" class="size-4 text-primary" />
            <span class="font-roboto-mono text-sm text-gray-300">Backup</span>
          </div>

          <div
            class="text-base font-roboto-mono flex items-center py-2 px-2 justify-center space-x-2 flex-1 border-x border-white/10"
          >
            <FontAwesomeIcon
              :icon="['fal', 'key-skeleton-left-right']"
              class="text-info shrink-0 text-sm w-auto"
            />
            <span class="text-sm text-gray-300">2of3</span>
          </div>

          <div class="text-base flex items-center justify-center py-2 px-2 space-x-2 flex-1">
            <FontAwesomeIcon :icon="['fal', 'sliders']" class="text-warning text-sm" />
            <span class="font-roboto-mono text-sm text-gray-300">P2WSH</span>
          </div>
        </div>

        <hr class="border-t border-white/10" />

        <div class="flex flex-col">
          <div class="flex items-start justify-between px-8 py-2">
            <div class="text-lg font-bold font-roboto-mono text-primary">Total:</div>
            <div class="flex flex-col items-end">
              <div class="font-roboto-mono text-lg space-x-1 text-gray-200">
                <span class="font-semibold">0.00011234</span>
                <span class="text-sm">BTC</span>
              </div>
              <div class="font-roboto-mono text-lg space-x-1 text-gray-200">
                <span class="">238</span>
                <span class="text-sm">CZK</span>
              </div>
            </div>
          </div>

          <hr class="pb-2 border-t border-white/5" />

          <div class="flex px-8 items-start justify-between text-gray-100">
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

          <hr class="border-t mt-2 pb-1 border-white/5" />

          <div class="flex px-8 items-start justify-between mt-1 text-gray-100">
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

          <hr class="border-t mt-2 pb-1 border-white/5" />

          <div class="flex px-8 items-start justify-between mt-1 text-gray-100">
            <div class="text-base font-roboto-mono">Unsend:</div>
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

          <hr class="border-t mt-2 pb-1 border-white/5" />

          <div class="flex items-center px-8 space-x-8 py-4 font-roboto-mono">
            <UButton label="Deposit" block size="xl" class="hover:cursor-pointer">
              <template #trailing>
                <FontAwesomeIcon :icon="['fal', 'arrow-down-left']" class="text-lg" />
              </template>
            </UButton>
            <UButton label="Withdraw" block size="xl" class="hover:cursor-pointer">
              <template #trailing>
                <FontAwesomeIcon :icon="['fal', 'arrow-up-right']" class="text-lg" />
              </template>
            </UButton>
          </div>
        </div>
      </div>

      <div class="w-[380px] mt-5 bg-dark-secondary rounded-md">
        <div class="flex items-center justify-between py-3 px-8">
          <div class="font-roboto-mono text-lg font-semibold text-gray-200">Wallet Keys</div>
          <FontAwesomeIcon :icon="['fal', 'key']" class="text-lg text-primary" />
        </div>
        <hr class="border-t border-white/5" />

        <div class="px-8 py-2 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-[40px] h-[34px] flex items-center justify-center">
              <TrezorDeviceIcon class="w-full max-h-[34px]" />
            </div>
            <div class="flex flex-col font-roboto-mono">
              <div class="text font-semibold text-gray-200">Sign key 1</div>
              <div class="text-xs uppercase text-gray-300">Trezor</div>
            </div>
          </div>
          <div class="">
            <FontAwesomeIcon :icon="['fas', 'check']" class="text-success" />
          </div>
        </div>

        <hr class="border-t pb-1 border-white/5" />

        <div class="px-8 py-2 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-[40px] h-[34px] flex items-center justify-center">
              <TrezorDeviceIcon class="w-full max-h-[34px]" />
            </div>
            <div class="flex flex-col font-roboto-mono">
              <div class="text font-semibold text-gray-200">Sign key 1</div>
              <div class="text-xs uppercase text-gray-300">Trezor</div>
            </div>
          </div>
          <div class="">
            <FontAwesomeIcon :icon="['fas', 'check']" class="text-success" />
          </div>
        </div>

        <hr class="border-t pb-1 border-white/5" />

        <div class="px-8 py-2 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-[40px] h-[34px] flex items-center justify-center">
              <LedgerDeviceIcon class="w-full max-h-[34px]" />
            </div>

            <div class="flex flex-col font-roboto-mono">
              <div class="text font-semibold text-gray-200">Sign key 1</div>
              <div class="text-xs uppercase text-gray-300">Trezor</div>
            </div>
          </div>
          <div class="">
            <FontAwesomeIcon :icon="['fas', 'check']" class="text-success" />
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
import LedgerDeviceIcon from '@shared/images/icons/LedgerDeviceIcon.vue';
import ActionNavigationButton from '~/components/layout/navigation/actionNavigation/ActionNavigationButton.vue';
import GitStatus from '@shared/components/marketing/GitStatus.vue';
import ColorModeButton from '@shared/components/ui/ColorModeButton.vue';
import SelectLanguage from '@shared/components/ui/SelectLanguage.vue';
import SmallMenuLink from '~/components/layout/navigation/smallNavigation/SmallMenuLink.vue';
import NavigationHeader from '~/components/layout/navigation/NavigationHeader.vue';
import AppNavigation from '~/components/layout/navigation/AppNavigation.vue';
import BitcoinIcon from '@shared/images/icons/BitcoinIcon.vue';
import { SIGN_DEVICES_LIST } from '@shared/types/SignKeys';
import TrezorDeviceIcon from '@shared/images/icons/TrezorDeviceIcon.vue';
</script>
