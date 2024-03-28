<template>
    <div :class="classes">
        <label v-if="label" :for="name">
            <text-adaptive size="14" type-text="special-label">
                {{ label }}
            </text-adaptive>
        </label>
        <div :class="classesWrapper">
            <svg-sprite v-if="prefixIcon" class="prefix-icon" :symbol="prefixIcon" />
            <input
                v-maska="bindedObject"
                ref="inputRef"
                :type="innerType"
                :data-maska="getMask"
                :data-maska-tokens="maskData?.data?.tokens"
                :name="name"
                :maxlength="maxLength"
                :disabled="disabled"
                :value="innerValue"
                :placeholder="placeholder"
                @keydown.space="(event) => (isDisableInputSpaces ? event.preventDefault() : false)"
                @change="emitChangeHandler"
                @focus="focusHandler"
                @keyup="onKeyupChange"
                @blur="blurHandler"
            />
            <svg-sprite
                v-if="suffixIcon || isPasswordType"
                class="suffix-icon"
                :symbol="iconType"
                @click="clickSuffixIconHandler"
            />
        </div>
        <div v-if="messages" class="base-input__messages">
            <svg-sprite symbol="annotations" />
            <text-adaptive size="12" :color="COLORS.BLACK_SECONDARY">{{ messages }}</text-adaptive>
        </div>
        <div v-if="validationError" class="base-input__error">
            <text-adaptive size="12" :color="COLORS.ERROR_PRIMARY">{{ validationError }}</text-adaptive>
        </div>
    </div>
</template>

<script lang="ts">
import { Mask } from "@/components/atoms/base-input/helpers";
import { MaskOnlySymbolsData, MaskPhoneData } from "@/components/atoms/base-input/types";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { COLORS } from "@/modules/colors";
import _ from "lodash";
import { vMaska } from "maska";
import { MaskaDetail } from "maska/dist/types/mask-input";
import { useField } from "vee-validate";
import { PropType, computed, defineComponent, onMounted, reactive, ref, watch } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

type VariantType = "outlined" | "underlined";
type SizeType = "giant" | "large" | "medium" | "small";

export default defineComponent({
    name: "BaseInput",
    components: { SvgSprite, TextAdaptive },
    emits: ["onChange", "onFocus", "onBlur", "onKeyupChange", "onEnter", "clickSuffixIcon"],
    directives: { maska: vMaska },
    props: {
        placeholder: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        class: {
            type: String,
            default: "",
        },
        variant: {
            type: String as PropType<VariantType>,
            default: "outlined",
        },
        value: {
            type: [String, Number],
            default: "",
        },
        name: {
            type: String,
            default: "",
        },
        type: {
            type: String as PropType<"text" | "password">,
            default: "text",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        maxLength: {
            type: Number,
            default: 350,
        },
        maskData: {
            type: Object as PropType<MaskPhoneData | MaskOnlySymbolsData | null>,
            default: null,
        },
        size: {
            type: String as PropType<SizeType>,
            default: "large",
        },
        error: {
            type: Boolean,
            default: false,
        },
        isDisableInputSpaces: {
            type: Boolean,
            default: false,
        },
        isFocus: {
            type: Boolean,
            default: false,
        },
        messages: String,
        prefixIcon: String,
        suffixIcon: String,
    },
    setup: function (props, { emit }) {
        const inputRef = ref<HTMLInputElement | null>(null);

        const isFocus = ref<boolean>(props.isFocus);
        const isPasswordType = ref<boolean>(false);
        const showPassword = ref<boolean>(false);
        const innerType = ref<string>(props.type);
        const bindedObject = reactive<MaskaDetail>({} as MaskaDetail);

        const emptyValueClass = computed(() => (!innerValue.value ? "empty-input" : ""));
        const focusClass = computed(() => (isFocus.value ? "focus-input" : ""));
        const disabledClass = computed(() => (props.disabled ? "disabled-input" : ""));
        const errorClass = computed(() => (props.error || !!validationError.value ? "error-input" : ""));
        const isLabel = computed(() => (props.label ? "has-label" : ""));

        const classes = computed<string>(() => `base-input ${props.class} ${isLabel.value}`);
        const classesWrapper = computed<string>(
            () =>
                `base-input__wrapper size-${props.size} ${emptyValueClass.value} ${focusClass.value} ${disabledClass.value} ${errorClass.value} variant-${props.variant}`,
        );
        const getMask = computed<string>(() => Mask.getTypeMask(props.maskData));

        const passwordIcon = computed<string>(() => (showPassword.value ? "eye" : "eye-off"));
        const iconType = computed<string>(() => (isPasswordType.value ? passwordIcon.value : props.suffixIcon || ""));

        const { value: innerValue, errorMessage: validationError } = useField(() => props.name, undefined, {
            initialValue: props.value,
        });

        onMounted(() => {
            if (props.value) innerValue.value = props.value;

            if (props.type === "password") isPasswordType.value = true;
        });

        function emitChangeHandler() {
            innerValue.value = bindedObject.unmasked;
            emit("onChange", Mask.getUnmaskedValue(props.maskData, bindedObject.unmasked), props.name);
        }

        function focusHandler() {
            isFocus.value = true;
            emit("onFocus", isFocus.value);
        }

        function blurHandler() {
            isFocus.value = false;
            emit("onBlur", isFocus.value);
        }

        function clickSuffixIconHandler() {
            if (isPasswordType.value) {
                showPassword.value = !showPassword.value;
                innerType.value = showPassword.value ? "text" : "password";
            }

            emit("clickSuffixIcon", innerValue.value);
        }

        const onKeyupChange = _.debounce((event: KeyboardEvent) => {
            innerValue.value = bindedObject.unmasked;

            if (event.key === "Enter") {
                emit("onEnter", Mask.getUnmaskedValue(props.maskData, bindedObject.unmasked));
            } else {
                emit("onKeyupChange", Mask.getUnmaskedValue(props.maskData, bindedObject.unmasked));
            }
        }, 500);

        watch(
            () => props.value,
            () => (innerValue.value = props.value),
        );

        watch(inputRef, () => {
            if (inputRef.value && props.isFocus) inputRef.value.focus();
        });

        return {
            inputRef,
            innerValue,
            classes,
            getMask,
            classesWrapper,
            iconType,
            isPasswordType,
            innerType,
            COLORS,
            bindedObject,

            validationError,

            emitChangeHandler,
            focusHandler,
            clickSuffixIconHandler,
            onKeyupChange,
            blurHandler,
        };
    },
});
</script>
