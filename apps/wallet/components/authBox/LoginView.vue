<template>
  <div class="contents">
    <EmailInput class="mt-4" />
    <PasswordInput class="mt-4" />
    <ConfirmButton @click="loginAction" title="Log in" class="mt-7" :loading="state.loading" />
  </div>
</template>

<script setup lang="ts">
import EmailInput from '~/components/authBox/inputs/EmailInput.vue';
import PasswordInput from '~/components/authBox/inputs/PasswordInput.vue';
import ConfirmButton from '~/components/authBox/inputs/ConfirmButton.vue';

const state = reactive({
  email: '',
  password: '',
  loading: false,
})

const loginAction = async () => {

};

</script>
