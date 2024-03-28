<template>
    <button :class="classes" :type="type" @click="clickHandler">
        <svg-sprite v-if="iconPrefix" class="prefix-icon" :symbol="iconPrefix" />
        <slot></slot>
        <svg-sprite v-if="iconSuffix" class="suffix-icon" :symbol="iconSuffix" />
    </button>
</template>

<script lang="ts">
import { SizeType, VariantType } from "./types";
import { PropType, computed, defineComponent } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseButton",
    components: { SvgSprite },
    emits: ["onClick"],
    props: {
        iconPrefix: String,
        iconSuffix: String,
        class: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "",
        },
        type: {
            type: String as PropType<"button" | "submit">,
            default: "button",
        },
        size: {
            type: String as PropType<SizeType>,
            default: "large",
        },
        variant: {
            type: String as PropType<VariantType>,
            default: "filled",
        },
    },
    setup(props, { emit }) {
        const classes = computed(() => `base-button variant-${props.variant} size-${props.size} ${props.class}`);

        function clickHandler(event: Event) {
            emit("onClick", event);
        }

        return {
            classes,
            clickHandler,
        };
    },
});
</script>
