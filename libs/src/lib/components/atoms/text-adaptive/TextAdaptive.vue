<template>
    <component :class="classes" :is="as"><slot></slot></component>
</template>

<script lang="ts">
import { AsType, SizeType, TextTransformType, TypeText, WeightType } from "./types";
import { COLORS } from "../../../modules/colors";
import { PropType, computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "TextAdaptive",
    props: {
        color: {
            type: String as PropType<COLORS>,
            default: "default",
        },
        class: {
            type: String,
            default: "",
        },
        size: {
            type: String as PropType<SizeType>,
            default: "16",
        },
        as: {
            type: String as PropType<AsType>,
            default: "p",
        },
        weight: {
            type: String as PropType<WeightType>,
            default: "normal",
        },
        textTransform: {
            type: String as PropType<TextTransformType>,
            default: "none",
        },
        typeText: {
            type: String as PropType<TypeText>,
            default: "default",
        },
        textPosition: {
            type: String as PropType<"left" | "center" | "right">,
            default: "left",
        },
    },
    setup(props) {
        const propertiesText = computed<string>(
            () =>
                `text-size-${props.size} text-transform-${props.textTransform} color-${props.color} text-position-${props.textPosition} ${props.weight}`,
        );

        const classes = computed<string>(
            () => `text-adaptive type-text-${props.typeText} ${propertiesText.value} ${props.class}`,
        );

        return {
            classes,
        };
    },
});
</script>
