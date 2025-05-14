<template>
  <div class="contents">
    <EmailInput class="mt-4" />
    <ConfirmButton
      @click="resetPasswordAction"
      title="Reset password"
      class="mt-7"
      :loading="state.loading"
    />
  </div>
</template>

<script setup lang="ts">
import EmailInput from '~/components/authBox/inputs/EmailInput.vue';
import ConfirmButton from '~/components/authBox/inputs/ConfirmButton.vue';

const state = reactive({
  email: '',
  loading: false,
});

const resetPasswordAction = async () => {};
</script>
