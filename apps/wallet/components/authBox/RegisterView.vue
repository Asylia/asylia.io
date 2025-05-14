<template>
  <div class="contents">
    <EmailInput class="mt-4" />
    <PasswordInput class="mt-4" />
    <PasswordInput class="mt-4" placeholder="Repeat password" />
    <ConfirmButton @click="registerAction" title="Register" class="mt-7" :loading="state.loading" />
  </div>
</template>

<script setup lang="ts">
import EmailInput from '~/components/authBox/inputs/EmailInput.vue';
import PasswordInput from '~/components/authBox/inputs/PasswordInput.vue';
import ConfirmButton from '~/components/authBox/inputs/ConfirmButton.vue';

const state = reactive({
  email: '',
  password: '',
  repeatPassword: '',
  loading: false,
});

const registerAction = async () => {};
</script>
