<template>
  <div class="md:flex py-6 items-center justify-between">
    <div class="flex items-center space-x-4 hover:cursor-pointer" @click="setTab('white-paper')">
      <Logo v-motion-pop-visible class="text-primary w-auto h-[52px] md:h-[64px]" />
      <div>
        <h1 class="text-2xl md:text-4xl text-slate-700 dark:text-gray-300 font-bold">Asylia.io</h1>
        <p class="mt-1 text-xs sm:text-sm italic text-slate-800 dark:text-gray-400">
          &ldquo;Arx, Imperium, Ostium&rdquo; - {{ $t('arx_imperium_ostium') }}
        </p>
      </div>
    </div>
    <div
      class="flex items-center space-x-5 grow mt-8 md:mt-0 mx-auto md:mr-0 max-w-full md:max-w-[40%]"
    >
      <client-only>
        <UTabs
          v-model="localTab"
          :items="TABS"
          :size="isMobile ? 'sm' : 'md'"
          :content="false"
          class="w-full rounded-full"
        />
        <ColorModeButton />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@shared/images/logo/AppLogo.vue';
import ColorModeButton from '@shared/components/ColorModeButton.vue';
import { useBreakPoints } from '@shared/composuables/ui/breakPoints';


const props = defineProps<{
  activeTab: string;
}>();

const { t } = useI18n();

const emit = defineEmits(['update:tab'] as const);

const localTab = ref(props.activeTab);

const TABS = ref([
  {
    value: 'white-paper',
    label: t('white_paper'),
    icon: 'i-lucide-scroll',
  },
  {
    value: 'roadmap',
    label: t('roadmap'),
    icon: 'i-streamline:arrow-roadmap',
  },
]);

watch(localTab, (v) => emit('update:tab', v));

const setTab = (key: string) => {
  localTab.value = key;
  emit('update:tab', key);
};

const { isMobile } = useBreakPoints();
</script>
