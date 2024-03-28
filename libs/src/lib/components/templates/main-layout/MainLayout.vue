<template>
  <div :style="dynamicStyles" className="main__container">
    <slot name="header"></slot>
      <slot name="menu"></slot>
      <slot></slot>
  </div>

</template>

<script setup lang="ts">
import { camelCase } from 'lodash';
import { computed } from 'vue';

const props = defineProps({
  paddingTop: String,
  paddingLeft: String
});

const dynamicStyles = computed(() => {
  return {
    paddingTop: props.paddingTop || '0px',
    paddingLeft: props.paddingLeft || '0px',
    height: "100vh"

  };
});

</script>
