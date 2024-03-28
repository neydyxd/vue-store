<template>
    <div :class="classes" :style="{ gap: `${gapValue}px` }">
        <slot />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "ColumnItem",
    props: {
        class: {
            type: String,
            default: "",
        },
        gapValue: {
            type: Number,
            default: 8,
        },
    },
    setup(props) {
        const classes = computed<string>(() => `column-item ${props.class}`);

        return { classes };
    },
});
</script>
