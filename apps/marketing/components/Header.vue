<template>
  <div class="md:flex py-6 items-center justify-between">
    <div @click="setTab('white-paper')" class="flex items-center space-x-4 hover:cursor-pointer">
      <Logo v-motion-pop-visible class="w-12 text-slate-700 dark:text-primary"/>
      <div>
        <h1 class="text-4xl text-primary dark:text-gray-300 font-bold">Asylia.io</h1>
        <p class="mt-1 text-sm italic text-slate-800 dark:text-gray-400">&ldquo;Arx, Imperium, Ostium&rdquo; -
          {{ $t('arx_imperium_ostium') }}</p>
      </div>
    </div>
    <div class="flex items-center space-x-5 grow mt-8 md:mt-0 mx-auto md:mr-0 max-w-full md:max-w-[40%]">
      <UTabs v-model="localTab" :items="TABS" :content="false" class="w-full"/>
      <UButton v-if="!colorMode.forced" @click="toggleDark" :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
               color="neutral" variant="ghost"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '~/components/icons/logo/logo.vue';

const props = defineProps<{
  activeTab: string
}>()

const {t} = useI18n();

const emit = defineEmits(['update:tab'] as const)

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
  }
])

watch(localTab, v => emit('update:tab', v));

const setTab = (key: string) => {
  localTab.value = key;
  emit('update:tab', key);
};

const openGithub = () => {
  window.open('https://github.com/Asylia', '_blank')
}

// dark mode
const colorMode = useColorMode();

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: v => colorMode.preference = v ? 'dark' : 'light'
});

const toggleDark = () => {
  isDark.value = !isDark.value;
}


</script>