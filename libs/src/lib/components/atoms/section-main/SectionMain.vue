<template>
    <div :class="classes"><slot></slot></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "SectionMain",
    props: {
        class: {
            type: String,
            default: "",
        },
        fluidContainer: {
            type: Boolean,
            default: false,
        },
        resizeContainer: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const classes = computed(
            () =>
                `container ${props.fluidContainer ? "fluid-container" : ""} ${
                    props.resizeContainer ? "resize-container" : ""
                } ${props.class}`,
        );

        return {
            classes,
        };
    },
});
</script>
