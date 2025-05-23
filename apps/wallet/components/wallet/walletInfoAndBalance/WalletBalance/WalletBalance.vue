<template>
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
</template>

<script setup>
import FontAwesomeIcon from '@shared/components/ui/font-awesome/FontAwesomeIcon.vue';
</script>
