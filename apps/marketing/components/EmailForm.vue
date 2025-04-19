<template>
  <div v-motion-pop-visible class="mt-12 flex flex-col justify-center items-center mx-auto ">
    <div v-html="$t('email_form.title')" class=" text-slate-800 dark:text-gray-300 mt-6 text-2xl text-center"></div>
    <form class="flex space-x-4 mt-6 w-full max-w-md">
      <input v-model="email"
             :disabled="loading"
             type="email" :placeholder="$t('email_form.placeholder')"
             class="w-full rounded-md px-4 py-2  bg-gray-500 dark:bg-slate-800 dark:text-gray-200  placeholder-gray-200 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600">
      <UButton :disabled="!emailValid"
               @click="saveEmail" :loading="loading" color="primary" :label="$t('email_form.send')"
               class="hover:cursor-pointer"/>
    </form>
  </div>
</template>

<script setup lang="ts">

const {t} = useI18n();
const supabase = useSupabaseClient();
const toast = useToast()

const email = ref('')
const loading = ref(false)
const emailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
})

const saveEmail = async () => {


  if (!emailValid.value) {
    toast.add({
      description: 'Invalid email address',
      color: 'error'
    })
    return
  }
  loading.value = true

  try {

    const {error} = await supabase.from('asylia_v1_marketing_survey').insert({
      email: email.value,
    })

    if (error) {
      toast.add({
        description: t('email_form.error'),
        color: 'error'
      })
    } else {
      toast.add({
        description: t('email_form.success'),
        color: 'success'
      })
      email.value = ''
    }


  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }

}

</script>