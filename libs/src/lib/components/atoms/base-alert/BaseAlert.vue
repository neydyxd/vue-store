<template>
    <div class="base-alert" :class="classes">
        <svg-sprite v-if="iconPrefix" :symbol="iconPrefix" />
        <text-adaptive v-if="$slots.default" size="12" weight="medium"><slot></slot></text-adaptive>
        <svg-sprite v-if="iconSuffix" :symbol="iconSuffix" />
    </div>
</template>

<script lang="ts">
import { BaseAlertSizeType, BaseAlertVariantType } from "./types";
import TextAdaptive from "../text-adaptive/TextAdaptive.vue";
import { PropType, computed, defineComponent } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseAlert",
    components: { SvgSprite, TextAdaptive },
    props: {
        iconPrefix: String,
        iconSuffix: String,
        class: {
            type: String,
            default: "",
        },
        variant: {
            type: String as PropType<BaseAlertVariantType>,
            default: "warning",
        },
        size: {
            type: String as PropType<BaseAlertSizeType>,
            default: "large",
        },
        nonBorder: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const classes = computed(
            () => `size-${props.size} variant-${props.variant} ${props.nonBorder ? "non-border" : ""} ${props.class}`,
        );

        return { classes };
    },
});
</script>
