<template>
  <v-icon v-if="!isActive" icon="mdi-bell" size="24px"></v-icon>
  <div v-if="isActive" class="text-center">
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-icon icon="mdi-bell-ring" size="24px"></v-icon>
        </v-btn>
      </template>

      <v-list style="width: 478px;">
        <div style="display: flex;justify-content: space-between; border-bottom: 1px solid grey; padding: 10px;">
          <h2 style="font-size: 20px; font-weight: bold;">Уведомления</h2>
          <v-icon icon="mdi-close" size="24px"></v-icon>
        </div>
        <NotificationItem v-for="(notification, index) in data" :key="index"
          :important="notification.important" :title="notification.title" :date="notification.date"
          :subtitle="notification.subtitle" />
      </v-list>
    </v-menu>
  </div>
</template>



<script setup lang="ts">

type ItemProps = {
  important?: boolean;
  title?: string;
  date?: string;
  subtitle?: string;
}

type NotificationMenuProps = {
  data: ItemProps[],
  isActive: boolean
}

const {data, isActive} = defineProps<NotificationMenuProps>();

import NotificationItem from "../../atoms/notification-item/NotificationItem.vue"
</script>
