<template>
  <ClientOnly>
    <div class=" space-x-4 flex items-center ">
      <USelect v-model="lang" :items="languages" item-value="value" :icon="selectedLang.icon" icon-key="icon"
               class="w-22 hover:cursor-pointer" size="sm"/>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {core} from '@shared/composuables/language'

// lang
const {
  lang,
  languages,
  selectedLang,
} = core.useLanguage()

</script>