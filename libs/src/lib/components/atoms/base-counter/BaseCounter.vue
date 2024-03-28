<template>
    <div class="base-counter">
        <div class="base-counter__controls">
            <svg-sprite symbol="minus" @click="() => countHandler('minus')" />
        </div>
        <label class="base-counter__values">
            <input
                v-maska
                :disabled="isDisabled"
                data-maska="####"
                type="text"
                ref="inputRef"
                :value="countState"
                @change="changeHandler"
            />
            <text-adaptive size="14" type-text="special-form" weight="bold" :color="COLORS.BLACK_PRIMARY"
                >шт.</text-adaptive
            >
        </label>
        <div class="base-counter__controls">
            <svg-sprite symbol="plus" @click="() => countHandler('plus')" />
        </div>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "../text-adaptive/TextAdaptive.vue";
import { COLORS } from "../../../modules/colors";
import { ResizableUtils } from "../../../utils/resizable-utils";
import { vMaska } from "maska";
import { computed, defineComponent, onBeforeUnmount, ref, watch } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseCounter",
    components: { TextAdaptive, SvgSprite },
    directives: { maska: vMaska },
    emits: ["onChangeHandler"],
    props: {
        value: {
            type: Number,
            default: 0,
        },
        maxCountLength: {
            type: Number,
        },
        minCountLength: {
            type: Number,
            default: 0,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const oldValue = ref<number>(props.value || 0);
        const countState = ref<number>(props.value || 0);

        let resizableInstance: ResizableUtils | null = null;

        const inputRef = ref<HTMLInputElement | null>(null);

        const isDisabledPlusElem = computed<boolean>(() => {
            if (props.maxCountLength) {
                return countState.value === props.maxCountLength;
            } else return false;
        });

        function countHandler(type: "plus" | "minus") {
            if (props.isDisabled) return;

            if (props.maxCountLength && countState.value > props.maxCountLength) return;

            if (type === "plus" && countState.value === props.maxCountLength) return;

            if (type === "plus" && isDisabledPlusElem.value) return;

            if (type === "minus" && countState.value === props.minCountLength) return;

            countState.value = type === "plus" ? countState.value + 1 : countState.value - 1;

            emit("onChangeHandler", countState.value);
        }

        function changeHandler(event: Event) {
            const value = Number((event.target as HTMLInputElement).value);

            if (props.maxCountLength !== undefined && value > props.maxCountLength) {
                (event.target as HTMLInputElement).value = `${props.maxCountLength}`;
            }

            countState.value =
                props.maxCountLength !== undefined && value > props.maxCountLength ? props.maxCountLength : value;

            emit("onChangeHandler", countState.value);
        }

        watch(inputRef, () => {
            if (inputRef.value) {
                resizableInstance = new ResizableUtils(inputRef.value);

                resizableInstance.resizableInput();
            }
        });

        watch(
            () => props.value,
            () => {
                countState.value = props.value;
            },
        );

        onBeforeUnmount(() => {
            if (inputRef.value && resizableInstance) {
                resizableInstance.removeListeners();
            }
        });

        return {
            oldValue,
            countState,
            COLORS,
            isDisabledPlusElem,
            inputRef,

            countHandler,
            changeHandler,
        };
    },
});
</script>
