<template>
  <client-only>
    <USelect
      v-model="lang"
      :items="languages"
      item-value="value"
      :icon="selectedLang.icon"
      icon-key="icon"
      class="w-22 hover:cursor-pointer"
      size="sm"
    />
  </client-only>
</template>

<script setup lang="ts">
import { core } from '@shared/composuables/language';

// lang
const { lang, languages, selectedLang } = core.useLanguage();
</script>
