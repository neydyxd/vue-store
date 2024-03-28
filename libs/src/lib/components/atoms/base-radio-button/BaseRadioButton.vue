<template>
    <div class="base-radio-button" :class="classes">
        <input
            class="base-radio-button__input"
            type="radio"
            :id="`base-radio-button-${value}`"
            :value="value"
            :disabled="disabled"
            :name="name"
            @input="() => changeHandler(value)"
            :checked="checked"
        />
        <label :for="`base-radio-button-${value}`" class="base-radio-button__label">
            <div class="base-radio-button__checked-component" />
            <div class="base-radio-button__slot">
                <text-adaptive
                    size="14"
                    type-text="special-label"
                    :color="disabled ? COLORS.SPECIAL_DISABLED_PRIMARY : COLORS.BLACK_PRIMARY"
                    ><slot></slot
                ></text-adaptive></div
        ></label>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { COLORS } from "@/modules/colors";
import { computed, defineComponent, ref } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "BaseRadioButton",
    components: { TextAdaptive },
    emits: ["onChangeHandler"],
    props: {
        class: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const innerValue = ref<string>(props.value);

        const classes = computed(() => props.class);

        function changeHandler(value: string) {
            innerValue.value = value;

            emit("onChangeHandler", value, props.name);
        }

        return { classes, innerValue, COLORS, changeHandler };
    },
});
</script>
