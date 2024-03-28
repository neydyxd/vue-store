<template>
  <v-layout className="header">
    <v-app-bar style="z-index: 1555;" :density="props.density" :color="props.color">
      <slot></slot>
    </v-app-bar>
  </v-layout>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import "./theme.scss"


type HeaderProps = {
  density: 'compact' | 'comfortable' | 'prominent'
}

const props = defineProps({
    color: { type: String, default: "black" },
    density: {type: String as PropType<HeaderProps['density']>, default: 'comfortable'}
});

</script>
