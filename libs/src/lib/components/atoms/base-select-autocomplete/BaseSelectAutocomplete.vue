<template>
    <div :class="classes">
        <label v-if="label" :for="name">
            <text-adaptive size="14">
                {{ label }}
            </text-adaptive>
        </label>
        <div :class="baseSelectAutocompleteWrapper">
            <v-autocomplete
                class="base-select-autocomplete__control"
                item-title="name"
                item-value="value"
                :items="items"
                :no-data-text="emptyDataText"
                :placeholder="placeholder"
                :disabled="disabled"
                :multiple="multiple"
                bg-color="transparent"
                hide-details
                v-model="innerValue"
                @focus="focusHandler"
                @blur="focusHandler"
                @update:modelValue="handleUpdate"
                append-inner-icon="mdi-chevron-down"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { IBaseSelectItemsProps } from "@/components/atoms/base-select/types";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { PropType, Ref, computed, defineComponent, onMounted, ref } from "vue";

import "./theme.scss";

type VariantType = "outlined" | "underlined";
type SizeType = "giant" | "large" | "medium" | "small";

export default defineComponent({
    name: "BaseSelectAutocomplete",
    components: { TextAdaptive },
    emits: ["onChange"],
    props: {
        placeholder: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        items: {
            type: Array as PropType<IBaseSelectItemsProps[]>,
            required: true,
        },
        emptyDataText: {
            type: String,
            default: "Нет списка для выбора",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Array] as PropType<string[]>,
        },
        class: {
            type: String,
            default: "",
        },
        size: {
            type: String as PropType<SizeType>,
            default: "large",
        },
        variant: {
            type: String as PropType<VariantType>,
            default: "outlined",
        },
    },
    setup(props, { emit }) {
        const isFocus: Ref<boolean> = ref(false);
        const innerValue = ref<string[]>([]);

        const emptyValueClass = computed(() => (!innerValue.value.length ? "empty-input" : ""));
        const focusClass = computed(() => (isFocus.value ? "focus-input" : ""));
        const disabledClass = computed(() => (props.disabled ? "disabled-input" : ""));

        const classes = computed<string>(() => `base-select-autocomplete ${props.class}`);
        const baseSelectAutocompleteWrapper = computed<string>(
            () =>
                `base-select-autocomplete__wrapper ${emptyValueClass.value} ${focusClass.value} ${disabledClass.value} variant-${props.variant}`,
        );

        onMounted(() => {
            if (props.value) innerValue.value = props.value;
        });

        function handleUpdate(value: string | string[]) {
            emit("onChange", value);
        }

        function focusHandler() {
            isFocus.value = !isFocus.value;
        }

        return {
            innerValue,
            classes,
            baseSelectAutocompleteWrapper,

            handleUpdate,
            focusHandler,
        };
    },
});
</script>
