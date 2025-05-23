<template>
  <div class="mt-5 bg-dark-secondary rounded-md">
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
</template>
<script setup lang="ts">
import LedgerDeviceIcon from '@shared/images/icons/LedgerDeviceIcon.vue';
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
import TrezorDeviceIcon from '@shared/images/icons/TrezorDeviceIcon.vue';
</script>
