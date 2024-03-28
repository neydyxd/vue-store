<template>
    <button type="button" :class="classes" :disabled="disabled" @click="clickHandler">
        <svg-sprite :symbol="icon" />
    </button>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

type VariantType = "filled" | "stroke" | "transparent" | "ghost";

export default defineComponent({
    name: "ButtonIcon",
    emits: ["clickHandler"],
    components: { SvgSprite },
    props: {
        class: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            required: true,
        },
        variant: {
            type: String as PropType<VariantType>,
            default: "filled",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const classes = computed(() => `button-icon variant-${props.variant} ${props.class}`);

        function clickHandler(event: Event) {
            emit("clickHandler", event);
        }

        return {
            classes,

            clickHandler,
        };
    },
});
</script>
