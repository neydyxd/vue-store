<template>
    <component :class="classes" :is="as"><slot></slot></component>
</template>

<script lang="ts">
import { AsType, TitleTransformType, WeightType } from "./types";
import { COLORS } from "../../../modules/colors";
import { PropType, computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "TitleAdaptive",
    props: {
        color: {
            type: String as PropType<COLORS>,
            default: "default",
        },
        class: {
            type: String,
            default: "",
        },
        as: {
            type: String as PropType<AsType>,
            default: "h1",
        },
        weight: {
            type: String as PropType<WeightType>,
        },
        titleTransform: {
            type: String as PropType<TitleTransformType>,
            default: "none",
        },
        titlePosition: {
            type: String as PropType<"left" | "center" | "right">,
            default: "left",
        },
    },
    setup(props) {
        const propertiesTitle = computed<string>(
            () =>
                `title-transform-${props.titleTransform} color-${props.color} title-position-${props.titlePosition} ${
                    props.weight || ""
                }`,
        );

        const classes = computed(() => `title-adaptive ${propertiesTitle.value} ${props.class}`);

        return {
            classes,
        };
    },
});
</script>
