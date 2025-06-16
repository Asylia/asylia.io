<template>
  <div class="w-full">
    <SetupNameAdnQuorum2 v-model="createNewWallet" />
    <!--    <SetupNameAdnQuorum v-model="createNewWallet" />-->
    <div class="mx-auto w-full max-w-6xl pt-4 px-8 flex flex-col h-screen justify-between">
      <div class="w-full flex-1">
        <div class="w-full flex items-center justify-between">
          <div class="flex space-x-4 items-center">
            <div class="">
              <Logo class="text-primary h-[82px]" />
            </div>

            <div class="w-full grow shrink">
              <h1 class="md:text-4xl text-slate-700 dark:text-gray-200 font-bold">Asylia.io</h1>
              <p class="mt-1 text-xs sm:text-sm italic text-slate-800 dark:text-gray-300">
                &ldquo;Arx, Imperium, Ostium&rdquo; - Pevnosť, Moc, Brána
              </p>
            </div>
          </div>

          <div class="flex space-x-2">
            <ColorModeButton />
            <SelectLanguage />
          </div>
        </div>

        <div class="flex flex-col h-full justify-center">
          <div class="text-gray-300 text-center pb-14 text-5xl font-bold leading-snug">
            Ultimate Bitcoin Wallet <br />
            security standards guaranteed
          </div>

          <div class="flex text-gray-200 items-center justify-evenly">
            <CtaBox @click="createNewWallet = true" :icon="['fas', 'shield-plus']">
              Create <br />
              wallet
            </CtaBox>

            <CtaBox :icon="['fas', 'file-import']">
              Import <br />
              wallet
            </CtaBox>

            <CtaBox :icon="['fas', 'globe']">
              Connect <br />
              wallet
            </CtaBox>
          </div>
        </div>
      </div>

      <div class="w-full shrink-0">
        <div class="w-full flex mt-4 items-center justify-end">
          <div
            class="flex flex-col italic pr-4 text-slate-800 dark:text-gray-400 border-r-4 border-primary z-20"
          >
            <div class="flex items-center justify-end">Secure your present and your</div>
            <div class="flex items-center justify-end space-x-1">
              <span>future will be secured.</span>
            </div>
          </div>
        </div>
        <div
          class="mx-auto w-full border-t pt-4 pb-4 mt-4 flex items-center justify-between border-white/5"
        >
          <GitStatus git-commit-hash="0afa9c0" />
          <div class="text-center text-gray-200 font-light">Asylia.io &copy; 2025</div>
          <SocialLinks />
        </div>
      </div>
    </div>
  </div>
  <div class="w-full h-screen flex items-center justify-center">
    <span class="text-gray-300 text-2xl">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import Logo from '@shared/images/logo/AppLogo.vue';
import GitStatus from '@shared/components/marketing/GitStatus.vue';
import ColorModeButton from '@shared/components/ui/ColorModeButton.vue';
import SelectLanguage from '@shared/components/ui/SelectLanguage.vue';
import SocialLinks from '@shared/components/marketing/SocialLinks.vue';
import CtaBox from '~/components/intro/CtaBox.vue';
import SetupNameAdnQuorum2 from '~/components/actions/createNewWallet2/setUpNameAndQuorum/SetupNameAdnQuorum.vue';
import { MiddlewareName as RediredctIfAsAnyWalletMiddleware } from '~/middleware/redirectIfAnyWalletExistsInLocalStorage.client';
import { useWalletStorageListStore } from '~/stores/wallet/storage/list';

const createNewWallet = ref(false);

const walletStorageListStore = useWalletStorageListStore();
walletStorageListStore.load();

definePageMeta({
  middleware: [RediredctIfAsAnyWalletMiddleware],
});
</script>
