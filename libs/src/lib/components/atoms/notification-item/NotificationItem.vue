<template>
  <v-list-item :style="dynamicStyles">
      <div style="display: flex; justify-content: space-between; min-width: 100%; align-items: start;">
        <p style="font-weight: bold; max-width: 320px; font-size: 15px;">{{ title }}</p>
        <p style="max-width: 80px; font-size: 12px;">{{ date }}</p>
      </div>
      <p style="font-size: 13px;">{{ subtitle }}</p>
  </v-list-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';


type NotificationItemProps = {
  important?: boolean;
  title?: string;
  date?: string;
  subtitle?: string;
}

const dynamicStyles = computed(() => {
  return {
    borderLeft: important ? "3px solid red" : 'none',
    borderBottom: "1px solid grey"
  };
});

const {important, title, date, subtitle} = defineProps<NotificationItemProps>();
</script>
