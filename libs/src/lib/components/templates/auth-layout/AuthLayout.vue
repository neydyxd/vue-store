<template>
  <div :style="containerStyles" className="auth__container">
    <div :style="contentStyles" className="auth__content">
      <slot></slot>
    </div>
  </div>

</template>

<script setup lang="ts">
import  "./style.scss"
import { computed } from 'vue';

type AuthLayoutProps = {
  background?: string;
  contentBackground?: string;
  contentBorder?: string;
}

const {background, contentBackground, contentBorder} = defineProps<AuthLayoutProps>();

const containerStyles = computed(() => {
  return {
    backgroundColor: background || "#2196F3",
  };
});

const contentStyles = computed(() => {
  return {
    backgroundColor: contentBackground || "white",
    border: contentBorder || "1px solid blue"
  };
});

</script>
