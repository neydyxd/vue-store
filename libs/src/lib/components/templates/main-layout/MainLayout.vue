<template>
  <div :style="dynamicStyles" className="main__container">
    <slot name="header" v-if="hasHeaderElement"></slot>
    <slot name="menu" v-if="hasMenuElement"></slot>
    <slot></slot>
  </div>

</template>

<style>
.v-navigation-drawer__header {
  top: 56px;
}
</style>

<script setup lang="ts">

import { computed, ref, onMounted } from 'vue';

const hasHeaderElement = ref(false);
const hasMenuElement = ref(false);
const paddingTop = ref('0px');
const paddingLeft = ref('0px');

onMounted(() => {

  const menuElement = document.getElementById('menu');
  hasMenuElement.value = !!menuElement;
  if (hasMenuElement.value) {
    paddingLeft.value = '255px';
  }

  const headerElement = document.getElementById('header');
  hasHeaderElement.value = !!headerElement;
  if (hasHeaderElement.value) {
    paddingTop.value = '56px';
  }

});

const dynamicStyles = computed(() => {
  return {
    paddingTop: paddingTop.value,
    paddingLeft: paddingLeft.value,
    height: "100vh"

  };
});

</script>
