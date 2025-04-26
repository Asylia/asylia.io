<template>
  <div class="py-8 rounded-tl-xl rounded-tr-xl">
    <div
      class="flex items-center justify-center md:justify-start text-center md:text-left space-x-2"
    >
      <span>
        <!--      <UIcon name="material-symbols:notifications-active-rounded" class="text-primary mr-1 mt-2 text-2xl"/>-->
        <span
          class="text-slate-800 text-2xl dark:text-gray-300 font-bold"
          v-html="$t('email_form.title')"
        />
      </span>
    </div>

    <form
      class="flex flex-col md:flex-row min-w-0 justify-center md:justify-start items-center md:space-x-4 mt-8 w-full mx-auto md:ml-0"
    >
      <input
        v-model="email"
        :disabled="loading"
        type="email"
        :placeholder="$t('email_form.placeholder')"
        class="w-full min-w-0 md:max-w-[400px] shrink-0 rounded-md border border-slate-500 px-4 py-2 bg-gray-100 dark:bg-slate-800 dark:text-gray-200 placeholder-slate-800 dark:placeholder-gray-500 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
      >
      <UButton
        :disabled="!emailValid"
        trailing-icon="material-symbols:alternate-email"
        :loading="loading"
        color="primary"
        :label="$t('email_form.send')"
        class="rounded-lg hover:cursor-pointer mt-8 md:mt-0"
        @click="saveEmail"
      />
    </form>
    <div class="mt-4 text-primary-700 flex justify-center md:justify-start">
      <EmailLink :dash="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EmailLink from '~/components/EmailLink.vue';

const { t } = useI18n();
const supabase = useSupabaseClient();
const toast = useToast();

const email = ref('');
const loading = ref(false);
const emailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const saveEmail = async () => {
  if (!emailValid.value) {
    toast.add({
      description: 'Invalid email address',
      color: 'error',
    });
    return;
  }
  loading.value = true;

  try {
    const { error } = await supabase.from('asylia_v1_marketing_survey').insert({
      email: email.value,
    });

    if (error) {
      toast.add({
        description: t('email_form.error'),
        color: 'error',
      });
    } else {
      toast.add({
        description: t('email_form.success'),
        color: 'success',
      });
      email.value = '';
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
