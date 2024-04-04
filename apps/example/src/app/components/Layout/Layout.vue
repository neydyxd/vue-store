<template>
  <main-layout>
    <Header color="blue" slot="header" id="header">
      <div className="header">
        <h2>Hello</h2>
        <div style="display: flex; gap: 20px; align-items: center;">
          <NotificationMenu :is-active="true" :data="notificationData"/>
          <DropdownMenu color="white" width="100px">
            <template #button>
              <v-icon icon="mdi-account" size="24px"></v-icon>
            </template>
            <ListItem @click="handleSignout">Выйти</ListItem>
          </DropdownMenu>
        </div>
      </div>
    </Header>
    <Menu backgroundColor="#2196F3" slot="menu" id="menu">
      <div style="padding: 56px 20px 0 20px;">
        <List lines="one">
          <ListItem variant="elevated" background-color="white" rounded="lg" margin-bottom="15px">Пункт 1</ListItem>
          <ListItem variant="elevated" background-color="white" rounded="lg" margin-bottom="15px">Пункт 2</ListItem>
          <ListItem variant="elevated" background-color="white" rounded="lg">Пункт 3</ListItem>
        </List>
      </div>
    </Menu>
    <div className="layout__container">
      <div className="layout__content">
        <slot></slot>
        <Footer>
          <h2 style="text-align: center;padding: 10px;">Test footer component</h2>
        </Footer>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { MainLayout, Header, Menu, DropdownMenu, ListItem, Footer, List, NotificationMenu } from "@store/libs"
import "./theme.scss"
import { useRouter } from "vue-router";
const router = useRouter();

function handleSignout() {
  router.push("/sign-in")
}

const notificationData: any = [
  {
    title:
      'Текст уведомления по доп. запросам должен иметь соответствующую конструкцию',
    date: '12.10.2023, 15:28',
    subtitle:
      'Получен доп. запрос по документу Договор № 0000-000002 от 14.02.2018+Спец 1”, “Счет-договор № 74 от 02.10.2018 от Читаишвили Зураб Тамазович',
  },
  {
    important: true,
    title:
      'Текст уведомления по доп. запросам должен иметь соответствующую конструкцию',
    date: '12.10.2023, 15:28',
    subtitle:
      'Получен доп. запрос по документу Договор № 0000-000002 от 14.02.2018+Спец 1”, “Счет-договор № 74 от 02.10.2018 от Читаишвили Зураб Тамазович',
  },
  {
    title:
      'Текст уведомления по доп. запросам должен иметь соответствующую конструкцию',
    date: '12.10.2023, 15:28',
    subtitle:
      'Получен доп. запрос по документу Договор № 0000-000002 от 14.02.2018+Спец 1”, “Счет-договор № 74 от 02.10.2018 от Читаишвили Зураб Тамазович',
  },
  {
    important: true,
    title:
      'Текст уведомления по доп. запросам должен иметь соответствующую конструкцию',
    date: '12.10.2023, 15:28',
    subtitle:
      'Получен доп. запрос по документу Договор № 0000-000002 от 14.02.2018+Спец 1”, “Счет-договор № 74 от 02.10.2018 от Читаишвили Зураб Тамазович',
  },
  {
    important: true,
    title:
      'Текст уведомления по доп. запросам должен иметь соответствующую конструкцию',
    date: '12.10.2023, 15:28',
    subtitle:
      'Получен доп. запрос по документу Договор № 0000-000002 от 14.02.2018+Спец 1”, “Счет-договор № 74 от 02.10.2018 от Читаишвили Зураб Тамазович',
  },
];

</script>
