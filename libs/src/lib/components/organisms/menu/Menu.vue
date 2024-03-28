<template>
  <v-layout>
      <v-navigation-drawer :style="dynamicStyles" permanent class="custom-drawer">
        <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
        <slot>
        </slot>
      </v-navigation-drawer>
  </v-layout>
</template>

<style scoped>

.custom-drawer {
  background-color: grey;
}
</style>


<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps({
  top: String,
  backgroundColor: String
});


const dynamicStyles = computed(() => {
  return {
    top: props.top || "0",

  };
});

</script>
