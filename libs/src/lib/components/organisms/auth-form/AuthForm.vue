<template>
  <v-sheet :width="props.width">
    <v-form className="form">
      <Input v-model="login" width="100%" variant="solo-filled" label="Логин" @handleChange="handleChangeLogin"></Input>
      <Input v-model="password" width="100%" variant="solo-filled" label="Пароль"
        @handleChange="handleChangePassword"></Input>
      <Button :disabled="validateData()" width="100px" size="large" @click="handleButtonClick">Войти</Button>
    </v-form>
  </v-sheet>
</template>


<script setup lang="ts">
import { ref } from 'vue';

import Button from "../../atoms/button/Button.vue"
import Input from "../../atoms/input/Input.vue"
import "./style.scss"

type AuthFormProps = {
  width?: string;
}
const props = defineProps<AuthFormProps>();

const login = ref('');
const password = ref('');

const handleChangeLogin = (value: string) => {
  login.value = value;
};

const handleChangePassword = (value: string) => {
  password.value = value;
};

const emit = defineEmits(['login', 'password', 'click']);

const handleButtonClick = () => {
  emit('login', login.value);
  emit('password', password.value);
  emit('click');
};

const validateData = () => {
  return login.value.trim() === '' || password.value.trim() === '';
};

</script>
