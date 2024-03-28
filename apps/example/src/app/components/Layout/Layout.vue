<template>
  <main-layout paddingTop="56px" paddingLeft="255px">
    <Header color="grey"  slot="header">
      <h2>Hello</h2>
    </Header>
    <Menu top="56px" slot="menu">
      <h1>Test</h1>
    </Menu>
    <div className="layout__container">
      <div className="layout__content">
        <slot></slot>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { MainLayout, Header, Menu } from "@store/libs"
import "./theme.scss"
</script>
