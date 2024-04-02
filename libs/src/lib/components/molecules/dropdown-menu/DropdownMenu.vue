<template>
  <div class="text-center">
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          :width="width"
          :color="color"
          v-bind="props"
        >
        <slot name="button"></slot>
        </v-btn>
      </template>

      <v-list>
        <slot></slot>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
type DropdownMenuProps = {
 width?: string,
  color?: string
}

const {width, color} = defineProps<DropdownMenuProps>();

</script>
