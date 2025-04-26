<template>
  <div class="flex items-center space-x-2">
    <a class="hover:cursor-pointer dark:text-primary hover:opacity-75" :href="`mailto:${contactEmail}`">
      {{ displayEmail }}
    </a>
    <UIcon
      v-if="props.hasCopyButton"
      name="material-symbols:content-copy"
      class="hover:cursor-pointer hover:opacity-75"
      :class="{
        'size-2': props.copyButtonSize === 2,
        'size-3': props.copyButtonSize === 3,
        'size-4': props.copyButtonSize === 4,
      }"
      @click="copyEmail"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  dash?: boolean;
  hasCopyButton?: boolean;
  copyButtonSize?: 2 | 3 | 4;
}

const props = withDefaults(defineProps<Props>(), {
  dash: true,
  hasCopyButton: true,
  copyButtonSize: 3,
});

const { t } = useI18n();
const toast = useToast();

const contactEmail = (useRuntimeConfig().public?.NUXT_PUBLIC_CONTACT_EMAIL ?? '') as string;
const displayEmail = computed<string>(() => `${props.dash ? '- ' : ''}${contactEmail}`);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(contactEmail);
    toast.add({
      description: t('email.copy.success'),
      color: 'success',
    });
  } catch {
    toast.add({
      description: t('email.copy.error'),
      color: 'error',
    });
  }
};
</script>
