<template>
    <div class="base-tag" :class="classes">
        <svg-sprite v-if="iconPrefix" :symbol="iconPrefix" />
        <text-adaptive size="12" weight="medium"><slot></slot></text-adaptive>
        <svg-sprite v-if="iconSuffix" :symbol="iconSuffix" />
    </div>
</template>

<script lang="ts">
import { BaseTagSizeType, BaseTagVariantType } from "@/components/atoms/base-tag/types";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { PropType, computed, defineComponent } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseTag",
    components: { SvgSprite, TextAdaptive },
    props: {
        iconPrefix: String,
        iconSuffix: String,
        class: {
            type: String,
            default: "",
        },
        variant: {
            type: String as PropType<BaseTagVariantType>,
            default: "brand",
        },
        size: {
            type: String as PropType<BaseTagSizeType>,
            default: "medium",
        },
    },
    setup(props) {
        const classes = computed(() => `size-${props.size} variant-${props.variant} ${props.class}`);

        return { classes };
    },
});
</script>
