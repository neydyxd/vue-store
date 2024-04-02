<template>
  <v-list-item :to="url" :width="width" :nav="true" :rounded="rounded" :style="dynamicStyles" :subtitle="subtitle" :variant="variant" @click="handleClick">
    <slot></slot>
  </v-list-item>
</template>

<script setup lang="ts">

type ListItemProps = {
  variant?: 'flat' | 'elevated' | 'tonal' | 'outlined' | 'text' | 'plain';
  subtitle?: string;
  backgroundColor?: string;
  color?: string;
  rounded?: string;
  width?: string;
  url?: string;
}

import { computed } from 'vue';

const {variant,subtitle, backgroundColor, color, rounded, width, url} = defineProps<ListItemProps>();

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};

const dynamicStyles = computed(() => {
  return {
    backgroundColor: backgroundColor || "white",
    color: color || 'black'
  };
});

</script>
