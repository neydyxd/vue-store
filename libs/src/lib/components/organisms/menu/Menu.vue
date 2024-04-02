<template>
  <v-layout>
      <v-navigation-drawer :style="dynamicStyles" >
        <slot>
        </slot>
      </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps({
  top: String,
  backgroundColor: String
});


const dynamicStyles = computed(() => {
  return {
    top: props.top || "0",
    backgroundColor: props.backgroundColor || "white",
  };
});

</script>
