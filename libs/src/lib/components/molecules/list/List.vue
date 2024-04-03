<template>
  <v-list bg-color="blue" :lines="lines">
    <slot></slot>
  </v-list>
</template>

<script setup lang="ts">

type ListProps = {
  lines?: 'one' | 'two' | 'three'
}

const { lines } = defineProps<ListProps>();

</script>
