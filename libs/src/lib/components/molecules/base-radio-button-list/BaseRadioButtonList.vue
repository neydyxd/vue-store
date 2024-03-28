<template>
    <div class="base-radio-button-list" :class="classes">
        <div v-for="(radio, index) in radioList" :key="index" class="base-radio-button-list__wrapper">
            <base-radio-button
                :disabled="disabled"
                :value="radio.value"
                :name="name"
                :checked="radio.value === innerValue"
                @on-change-handler="changeHandler"
                >{{ radio.label }}</base-radio-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import BaseRadioButton from "@/components/atoms/base-radio-button/BaseRadioButton.vue";
import { PropType, computed, defineComponent, ref } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "BaseRadioButtonList",
    components: { BaseRadioButton },
    emits: ["onChangeHandler"],
    props: {
        radioList: {
            type: Array as PropType<{ label: string; value: string }[]>,
            required: true,
        },
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
        defaultCheckedValue: {
            type: String,
        },
        variantList: {
            type: String as PropType<"vertical" | "horizontal">,
            default: "horizontal",
        },
    },
    setup(props, { emit }) {
        const innerValue = ref<string>(props.defaultCheckedValue || props.radioList[0].value);

        const classes = computed(() => `variant-${props.variantList} ${props.class}`);

        function changeHandler(value: string, name: string) {
            innerValue.value = value;

            emit("onChangeHandler", value, name);
        }

        return { classes, innerValue, changeHandler };
    },
});
</script>
