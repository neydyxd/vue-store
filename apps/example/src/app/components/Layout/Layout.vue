<template>
  <main-layout>
    <Header color="blue" slot="header" id="header">
      <div className="header">
        <h2>Hello</h2>
        <DropdownMenu color="white" width="100px">
          <template #button>
            <v-icon icon="mdi-account" size="24px"></v-icon>
          </template>
          <ListItem @click="handleSignout">Выйти</ListItem>
        </DropdownMenu>
      </div>
    </Header>
    <Menu backgroundColor="#2196F3" slot="menu" id="menu">
      <div style="padding: 56px 0 0 0;">
        <List  lines="one">
          <ListItem variant="elevated" background-color="white" rounded="lg" margin-bottom="15px">Hello</ListItem>
          <ListItem variant="elevated" background-color="white" rounded="lg" margin-bottom="15px">Hello</ListItem>
          <ListItem variant="elevated" background-color="white" rounded="lg">Hello</ListItem>
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
import { MainLayout, Header, Menu, DropdownMenu, ListItem, Footer, List } from "@store/libs"
import "./theme.scss"
import { useRouter } from "vue-router";
const router = useRouter();

function handleSignout() {
  router.push("/sign-in")
}

</script>
