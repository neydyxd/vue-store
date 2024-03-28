<template>
    <div :class="classes">
        <input
            class="base-checkbox__input"
            :id="`base-checkbox-${name}`"
            v-model="innerValue"
            :disabled="disabled"
            type="checkbox"
            :name="name"
        />
        <label :for="`base-checkbox-${name}`" class="base-checkbox__label">
            <div class="base-checkbox__label-check">
                <svg-sprite v-if="innerValue" symbol="check" class="base-checkbox__icon" />
            </div>

            <div v-if="$slots.default" class="base-checkbox__slot">
                <text-adaptive size="14" type-text="special-label">
                    <slot></slot>
                </text-adaptive></div
        ></label>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "../text-adaptive/TextAdaptive.vue";
import { useField } from "vee-validate";
import { PropType, computed, defineComponent, watch } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

type VariantPropsType = "default" | "secondary";

export default defineComponent({
    name: "BaseCheckbox",
    components: { TextAdaptive, SvgSprite },
    emits: ["onChange"],
    props: {
        name: {
            type: String,
            required: true,
        },
        class: {
            type: String,
            default: "",
        },
        variant: {
            type: String as PropType<VariantPropsType>,
            default: "default",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const checkedClasses = computed(() => (innerValue.value ? "has-checked" : ""));
        const errorClass = computed(() => (!meta.valid && meta.touched ? "error" : ""));
        const classes = computed(
            () => `base-checkbox variant-${props.variant} ${checkedClasses.value} ${props.class} ${errorClass.value}`,
        );

        const {
            value: innerValue,
            meta,
            handleChange,
        } = useField(() => props.name, undefined, {
            initialValue: props.value,
        });

        watch(innerValue, (value) => {
            if (props.value !== value) emit("onChange", props.name, innerValue.value);
        });

        watch(
            () => props.value,
            () => {
                handleChange(props.value);
            },
        );

        return {
            classes,
            innerValue,
            meta,
        };
    },
});
</script>
