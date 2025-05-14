<template>
  <div class="contents">
    <UTabs v-model="view" :items="TABS" size="md" :content="false" class="w-full rounded-full" />
    <component :is="displayComponent" />
  </div>
</template>

<script setup lang="ts">
import LoginView from '~/components/authBox/LoginView.vue';
import RegisterView from '~/components/authBox/RegisterView.vue';
import PasswordView from '~/components/authBox/PasswordView.vue';

const AUTH_VIEWS = {
  LOGIN: 'login',
  ROADMAP: 'roadmap',
  PASSWORD: 'password',
};

const COMPONENTS_VIEWS = {
  [AUTH_VIEWS.LOGIN]: LoginView,
  [AUTH_VIEWS.ROADMAP]: RegisterView,
  [AUTH_VIEWS.PASSWORD]: PasswordView,
};

const view = ref(AUTH_VIEWS.LOGIN);
const TABS = ref([
  {
    value: AUTH_VIEWS.LOGIN,
    label: 'Login',
  },
  {
    value: AUTH_VIEWS.ROADMAP,
    label: 'Register',
  },
  {
    value: AUTH_VIEWS.PASSWORD,
    label: 'Password',
  },
]);

const displayComponent = computed(() => COMPONENTS_VIEWS[view.value]);
</script>
