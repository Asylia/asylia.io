<template>
  <UContainer>
    <AnimationWrapper id="multisig-table-explain" class="w-full mt-30">
      <div class="grid w-full lg:grid-cols-[240px_1fr] gap-2 lg:gap-8">
        <div />
        <div class="min-w-0">
          <div class="flex items-center justify-center md:justify-start space-x-2">
            <h2
              class="text-3xl text-center md:text-left font-bold text-slate-800 dark:text-white md:text-4xl"
            >
              {{ $t('multisig_schema.title') }}
            </h2>
          </div>
          <p
            class="italic text-center mx-auto md:text-left text-slate-600 dark:text-gray-500 mt-4 text-base md:text-lg"
          >
            {{ $t('multisig_schema.p') }}
          </p>
        </div>
      </div>

      <MultisigSchema
        id="multisig-table"
        class="grid w-full md:mt-12 lg:grid-cols-[240px_1fr] gap-2 lg:gap-8"
        aside-class="mt-21"
      >
        <template v-if="showScrollBackButton" #under-table>
          <div class="w-full flex mt-5 items-center justify-end">
            <UButton
              :variant="isDark ? 'outline' : 'solid'"
              icon="i-lucide-scroll"
              trailing-icon="i-material-symbols:keyboard-double-arrow-up-rounded"
              size="sm"
              class="!rounded-sm hover:cursor-pointer"
              color="info"
              @click="scrollBackToWhitePaper4"
            >
              {{ $t('multisig_schema.backToWhitePaper') }}
            </UButton>
          </div>
        </template>
      </MultisigSchema>

    </AnimationWrapper>
  </UContainer>
</template>

<script setup lang="ts">
import appColorMode from '@shared/composuables/ui/colorMode';
import {
  autoScrolledToMultisig,
  autoScrolledToMultisigFrom,
  SCROLLED_FROM,
} from '@shared/components/help/multisigSchema/composuables';
import MultisigSchema from '@shared/components/help/multisigSchema/MultisigSchema.vue';

const { isDark } = appColorMode();

const showScrollBackButton = computed(
  () =>
    autoScrolledToMultisig.value &&
    [SCROLLED_FROM.INTRO.KEY, SCROLLED_FROM.POINT_4_4.KEY].includes(
      autoScrolledToMultisigFrom.value,
    ),
);

const scrollBackToWhitePaper4 = () => {
  let target = null;
  if (autoScrolledToMultisigFrom.value === SCROLLED_FROM.INTRO.KEY) target = SCROLLED_FROM.INTRO.ID;
  if (autoScrolledToMultisigFrom.value === SCROLLED_FROM.POINT_4_4.KEY)
    target = SCROLLED_FROM.POINT_4_4.ID;
  if (!target) return;
  const whitePaper4Section = document.getElementById(target);
  autoScrolledToMultisig.value = false;
  if (!whitePaper4Section) return;
  whitePaper4Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

</script>
