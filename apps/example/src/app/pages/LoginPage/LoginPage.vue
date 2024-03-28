<template>
  <AuthLayout>
    <AuthForm @login="handleLogin" @password="handlePassword" @click="handleButtonClick" width="600px" />
  </AuthLayout>
</template>

<script setup lang="ts">
import { AuthForm, AuthLayout } from "@store/libs";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const loginValue = ref('');
const passwordValue = ref('');

const handleLogin = (login: string) => {
  loginValue.value = login;
};

const handlePassword = (password: string) => {
  passwordValue.value = password;
};

const handleButtonClick = () => {
  console.log("Логин: ", loginValue.value, ", Пароль: ", passwordValue.value);
  router.push('/');
};
</script>
