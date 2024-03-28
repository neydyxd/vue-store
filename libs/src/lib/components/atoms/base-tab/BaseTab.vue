<template>
    <div :class="classes">
        <base-button :variant="innerVariant" @click="clickHandler" :icon-prefix="iconPrefix" :icon-suffix="iconSuffix"
            ><text-adaptive size="14" weight="medium" type-text="special-button"><slot></slot></text-adaptive
        ></base-button>
    </div>
</template>

<script lang="ts">
import BaseButton from "@/components/atoms/base-button/BaseButton.vue";
import { VariantType } from "@/components/atoms/base-button/types";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { PropType, computed, defineComponent } from "vue";

export default defineComponent({
    name: "BaseTab",
    components: { TextAdaptive, BaseButton },
    emits: ["onClick"],
    props: {
        iconPrefix: String,
        iconSuffix: String,
        class: {
            type: String,
            default: "",
        },
        active: {
            type: Boolean,
            default: true,
        },
        variant: {
            type: String as PropType<VariantType>,
            default: "transparent",
        },
    },
    setup(props, { emit }) {
        const classes = computed(() => `base-tab ${props.active ? "active-tab" : ""} ${props.class}`);
        const innerVariant = computed<VariantType>(() => (props.active ? props.variant : "ghost"));

        function clickHandler() {
            emit("onClick");
        }

        return {
            classes,
            innerVariant,

            clickHandler,
        };
    },
});
</script>
