<template>
  <v-responsive class="mx-auto" :width="props.width">
    <v-text-field :bg-color="props.backgroundColor" :variant="props.variant" :disabled="props.disabled" :placeholder="props.placeholder"
      :label="props.label" v-model="inputValue" @input="handleChange"></v-text-field>
  </v-responsive>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type InputProps = {
  variant: "filled" | "underlined" | "outlined" | "plain" | "solo" | "solo-inverted" | "solo-filled";
  label: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  backgroundColor?: string;
}

const props = defineProps<InputProps>();

const emit = defineEmits(['handleChange']);

const inputValue = ref('');

const handleChange = (event: Event) => {
  inputValue.value = (event.target as HTMLInputElement).value;
  emit('handleChange', inputValue.value);
};
</script>
