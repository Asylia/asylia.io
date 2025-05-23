<template>
  <div class="w-64 flex flex-col h-full shrink-0">
    <NavigationHeader />

    <div class="flex flex-col mt-5 space-y-2">
      <MenuSection :wallets="walletList" />
    </div>

    <div class="flex-1 h-full"></div>

    <div class="grow-0 shrink-0 flex flex-col w-full mt-10">
      <SmallMenuLink :icon="['fads', 'eye']" title="Private Mode" class="rounded-t-md" divider>
        <USwitch v-model="privateMode" size="sm" />
      </SmallMenuLink>
      <SmallMenuLink :icon="['fadt', 'gear']" title="Settings" divider />
      <SmallMenuLink :icon="['fads', 'help']" title="Help" class="rounded-b-md" />
    </div>

    <div class="flex shrink-0 justify-end w-full mt-5 rounded-md border-white/5 cursor-pointer">
      <ActionNavigationButton :icon="['fas', 'shield-plus']" title="Create" class="rounded-l-md" />
      <ActionNavigationButton :icon="['fas', 'file-import']" title="Import" divider-x />
      <ActionNavigationButton :icon="['fas', 'globe']" title="Connect" class="rounded-r-md" />
    </div>

    <div class="px-2 shrink-0 py-4 text-center text-white font-light font-roboto-mono text-xs">
      MIT License - 2025
    </div>
  </div>
</template>
<script setup lang="ts">
import ActionNavigationButton from '~/components/layout/navigation/actionNavigation/ActionNavigationButton.vue';
import SmallMenuLink from '~/components/layout/navigation/smallNavigation/SmallMenuLink.vue';
import MenuSection from '~/components/layout/navigation/mainNavigation/MenuSection.vue';
import NavigationHeader from '~/components/layout/navigation/NavigationHeader.vue';

const privateMode = ref(false);

const walletList = ref([
  { id: 'wallet-1', label: 'Wallet 1' },
  { id: 'wallet-2', label: 'Wallet 2' },
  { id: 'wallet-3', label: 'Wallet 3' },
  { id: 'wallet-4', label: 'Wallet 4' },
]);
</script>
