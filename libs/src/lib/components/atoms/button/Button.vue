<template>
  <v-btn :width="$props.width" :rounded="rounded" :disabled="disabled" :variant="variant" :color="color" :size="size" @click="handleClick">
    <template v-if="prependIcon" v-slot:prepend>
      <v-icon :icon="prependIcon"></v-icon>
    </template>
    <slot></slot>
    <template v-if="appendIcon" v-slot:append>
      <v-icon :icon="appendIcon"></v-icon>
    </template>
  </v-btn>
</template>

<script setup lang="ts">

type ButtonProps = {
  variant?: 'outlined' | 'tonal' | 'text' | 'plain' | 'flat' | 'elevated';
  color?: string;
  width?: string
  size?: 'x-small' | 'small' | 'large' | 'x-large',
  disabled?: boolean,
  rounded?: '0' | 'xs' | 'sm' | 'lg' | 'xl',
  prependIcon?: string,
  appendIcon?: string,
  handleClick?: () => void
}

const { variant, color, size, disabled, rounded, prependIcon, appendIcon } = defineProps<ButtonProps>();

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>
