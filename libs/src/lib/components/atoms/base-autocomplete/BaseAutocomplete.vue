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
        <div :class="baseAutocompleteWrapper">
            <v-combobox
                no-filter
                hide-details
                hide-no-data
                item-title="title"
                item-value="value"
                class="base-autocomplete__control"
                bg-color="transparent"
                :maxLength="maxLengthInput"
                :items="itemsData"
                :placeholder="placeholder"
                :disabled="disabled"
                :loading="loading"
                :type="typeInput"
                v-model="innerValue"
                v-model:search="keyword"
                @focus="focusHandler"
                @blur="focusHandler"
                @update:modelValue="handleUpdate"
                :menu-props="{ attach: 'base-autocomplete' }"
            >
                <template #item="{ item, props }">
                    <v-list-item v-bind="props">
                        <template #title>
                            <text-adaptive size="14" type-text="special-label">{{ item.title }}</text-adaptive>
                        </template>
                        <template #subtitle>
                            <text-adaptive
                                v-if="item.value.description"
                                size="12"
                                type-text="subtitle"
                                :color="COLORS.BLACK_SECONDARY"
                                >{{ item.value.description }}</text-adaptive
                            >
                        </template>
                    </v-list-item>
                </template>
            </v-combobox>
        </div>
        <div v-if="messages" class="base-autocomplete__messages">
            <svg-sprite symbol="annotations" />
            <text-adaptive size="12" :color="COLORS.BLACK_SECONDARY">{{ messages }}</text-adaptive>
        </div>
        <div v-if="validationError" class="base-autocomplete__error">
            <text-adaptive size="12" :color="COLORS.ERROR_PRIMARY">{{ validationError }}</text-adaptive>
        </div>
    </div>
</template>

<script lang="ts">
import { IBaseAutocompleteItemProps } from "./types";
import TextAdaptive from "../text-adaptive/TextAdaptive.vue";
import { COLORS } from "../../../modules/colors";
import { useField } from "vee-validate";
import { PropType, Ref, computed, defineComponent, onMounted, ref, watch } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

type VariantType = "outlined" | "underlined";
type SizeType = "giant" | "large" | "medium" | "small";

export default defineComponent({
    name: "BaseAutocomplete",
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
            type: Array as PropType<IBaseAutocompleteItemProps[]>,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Object] as PropType<string | IBaseAutocompleteItemProps>,
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
        typeInput: {
            type: String as PropType<"text" | "number">,
            default: "text",
        },
        maxLengthInput: {
            type: Number,
            default: 350,
        },
    },
    setup(props, { emit }) {
        const isFocus: Ref<boolean> = ref(false);

        const keyword = ref<string>("");
        const loading = ref<boolean>(false);
        const emptyValueClass = computed(() => (!innerValue.value ? "empty-input" : ""));
        const focusClass = computed(() => (isFocus.value ? "focus-input" : ""));
        const disabledClass = computed(() => (props.disabled ? "disabled-input" : ""));
        const classes = computed<string>(
            () => `base-autocomplete  display-option-${props.displayOption} ${props.class}`,
        );
        const errorClass = computed(() => (props.error || !!validationError.value ? "error-autocomplete" : ""));
        const baseAutocompleteWrapper = computed<string>(
            () =>
                `base-autocomplete__wrapper size-${props.size} ${emptyValueClass.value} ${focusClass.value} ${disabledClass.value} ${errorClass.value} variant-${props.variant}`,
        );
        const itemsData = ref<IBaseAutocompleteItemProps[]>(props.items || []);

        const { value: innerValue, errorMessage: validationError } = useField(props.name, undefined, {
            initialValue: props.value || (props.items?.length ? props.items[0] : ""),
        });

        onMounted(() => {
            if (props.value) innerValue.value = props.value;
        });

        function handleUpdate(value: string | IBaseAutocompleteItemProps) {
            emit("onChange", value);
        }

        function focusHandler() {
            isFocus.value = !isFocus.value;
        }

        watch(
            () => props.value,
            () => (innerValue.value = props.value || ""),
        );

        watch(
            () => props.items,
            () => {
                itemsData.value = props.items || [];
            },
        );

        return {
            innerValue,
            classes,
            baseAutocompleteWrapper,
            COLORS,
            validationError,
            itemsData,
            keyword,
            loading,

            handleUpdate,
            focusHandler,
        };
    },
});
</script>
