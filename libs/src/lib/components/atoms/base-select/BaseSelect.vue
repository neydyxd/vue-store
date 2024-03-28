<template>
    <div :class="classes">
        <label v-if="label" :for="name">
            <text-adaptive
                size="14"
                type-text="special-label"
                :color="disabled ? COLORS.SPECIAL_DISABLED_PRIMARY : COLORS.BLACK_PRIMARY"
            >
                {{ label }}
            </text-adaptive>
        </label>
        <div :class="baseSelectWrapper">
            <v-select
                class="base-select__control"
                item-title="name"
                item-value="value"
                :items="items"
                :chips="isChips"
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
                clear-icon="mdi-close"
                :clearable="isClearable"
            />
        </div>
        <div v-if="messages" class="base-select__messages">
            <svg-sprite symbol="annotations" />
            <text-adaptive size="12" :color="COLORS.BLACK_SECONDARY">{{ messages }}</text-adaptive>
        </div>
        <div v-if="validationError" class="base-select__error">
            <text-adaptive size="12" :color="COLORS.ERROR_PRIMARY">{{ validationError }}</text-adaptive>
        </div>
    </div>
</template>

<script lang="ts">
import { IBaseSelectItemsProps } from "@/components/atoms/base-select/types";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { COLORS } from "@/modules/colors";
import { useField } from "vee-validate";
import { PropType, Ref, computed, defineComponent, ref, watch } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

type VariantType = "outlined" | "underlined";
type SizeType = "giant" | "large" | "medium" | "small";

export default defineComponent({
    name: "BaseSelect",
    components: { SvgSprite, TextAdaptive },
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
            type: Array as PropType<IBaseSelectItemsProps[] | []>,
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
            type: [String, Array] as PropType<string[] | string>,
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
        displayOption: {
            type: String as PropType<"vertical" | "horizontal">,
            default: "vertical",
        },
        error: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        messages: String,
        isClearable: {
            type: Boolean,
            default: false,
        },
        isChips: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const isFocus: Ref<boolean> = ref(false);
        const isShopChose: Ref<boolean> = ref(false);

        const emptyValueClass = computed(() => (!innerValue.value?.length ? "empty-input" : ""));
        const focusClass = computed(() => (isFocus.value ? "focus-input" : ""));
        const disabledClass = computed(() => (props.disabled ? "disabled-input" : ""));
        const classes = computed<string>(
            () =>
                `base-select  display-option-${props.displayOption} ${props.isChips ? "has-chips" : ""} ${props.class}`,
        );
        const errorClass = computed(() => (props.error || !!validationError.value ? "error-select" : ""));
        const baseSelectWrapper = computed<string>(
            () =>
                `base-select__wrapper size-${props.size} ${props.isClearable ? "has-clearable" : ""} ${
                    emptyValueClass.value
                } ${focusClass.value}` +
                `${disabledClass.value} ${errorClass.value} variant-${props.variant} ` +
                (isShopChose.value ? "max-content" : ""),
        );

        const {
            value: innerValue,
            errorMessage: validationError,
            handleChange,
        } = useField(props.name, undefined, {
            initialValue:
                props.value || (props.items?.length ? (props.isChips ? [props.value] : [props.items[0]?.value]) : []),
        });

        function handleUpdate(value: string | string[]) {
            emit("onChange", value);
        }

        function focusHandler() {
            isFocus.value = !isFocus.value;
        }

        watch(
            () => props.value,
            () => {
                handleChange(props.value || []);
            },
        );

        return {
            innerValue,
            classes,
            baseSelectWrapper,
            COLORS,
            validationError,
            isShopChose,

            handleUpdate,
            focusHandler,
        };
    },
});
</script>
