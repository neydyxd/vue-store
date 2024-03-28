<template>
    <div :class="classes">
        <label v-if="label" :for="name">
            <text-adaptive size="14" type-text="special-label">
                {{ label }}
            </text-adaptive>
        </label>
        <div :class="classesWrapper">
            <textarea
                ref="textAreaRef"
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

            <div v-if="!isFocus && !innerValue" class="base-text-field__placeholder">
                <text-adaptive size="14" :color="COLORS.BLACK_SECONDARY"><slot name="placeholder" /></text-adaptive>
            </div>
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
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { COLORS } from "@/modules/colors";
import _ from "lodash";
import { useField } from "vee-validate";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseTextField",
    components: { SvgSprite, TextAdaptive },
    emits: ["onChange", "onFocus", "onBlur", "onKeyupChange", "onEnter"],
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
        value: {
            type: [String, Number],
            default: "",
        },
        name: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        maxLength: {
            type: Number,
            default: 350,
        },
        error: {
            type: Boolean,
            default: false,
        },
        isDisableInputSpaces: {
            type: Boolean,
            default: false,
        },
        isResize: {
            type: Boolean,
            default: false,
        },
        messages: String,
    },
    setup: function (props, { emit }) {
        const textAreaRef = ref<HTMLTextAreaElement | null>(null);
        const emptyValueClass = computed(() => (!innerValue.value ? "empty-text-field" : ""));
        const focusClass = computed(() => (isFocus.value ? "focus-text-field" : ""));
        const disabledClass = computed(() => (props.disabled ? "disabled-text-field" : ""));
        const errorClass = computed(() => (props.error || !!validationError.value ? "error-text-field" : ""));

        const isFocus = ref<boolean>(false);
        const isLabel = computed(() => (props.label ? "has-label" : ""));

        const classes = computed<string>(() => `base-text-field ${props.class} ${isLabel.value}`);
        const classesWrapper = computed<string>(
            () =>
                `base-text-field__wrapper ${emptyValueClass.value} ${focusClass.value} ${disabledClass.value} ${errorClass.value}`,
        );

        const {
            value: innerValue,
            errorMessage: validationError,
            handleChange,
        } = useField(() => props.name, undefined, {
            initialValue: props.value,
        });

        onMounted(() => {
            if (props.value) innerValue.value = props.value;
        });

        function emitChangeHandler(event: Event) {
            const value = (event.target as HTMLTextAreaElement).value;

            handleChange(value);

            emit("onChange", value, props.name);
        }

        function focusHandler() {
            isFocus.value = true;
            emit("onFocus", isFocus.value);
        }

        function blurHandler() {
            isFocus.value = false;
            emit("onBlur", isFocus.value);
        }

        function onKeyupChange(event: KeyboardEvent) {
            if (props.isResize && textAreaRef.value) {
                textAreaRef.value.style.height = "5px";
                textAreaRef.value.style.height = textAreaRef.value.scrollHeight + "px";
            }

            debounceChange(event);
        }

        const debounceChange = _.debounce((event: KeyboardEvent) => {
            const value = (event.target as HTMLTextAreaElement).value;

            handleChange(value);

            if (event.key === "Enter") {
                emit("onEnter", value);
            } else {
                emit("onKeyupChange", value);
            }
        }, 500);

        watch(
            () => props.value,
            () => (innerValue.value = props.value),
        );

        return {
            textAreaRef,
            innerValue,
            classes,
            classesWrapper,
            COLORS,
            isFocus,

            validationError,

            emitChangeHandler,
            focusHandler,
            onKeyupChange,
            blurHandler,
        };
    },
});
</script>
