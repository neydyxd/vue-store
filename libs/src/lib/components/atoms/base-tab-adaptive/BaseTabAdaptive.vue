<template>
    <div :class="classes">
        <button type="button" @click="clickHandler">
            <text-adaptive :color="COLORS.BLACK_SECONDARY" size="14" weight="medium" type-text="special-button"
                ><slot></slot
            ></text-adaptive>
        </button>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { COLORS } from "@/modules/colors";
import { computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "BaseTabAdaptive",
    components: { TextAdaptive },
    emits: ["onClick"],
    props: {
        class: {
            type: String,
            default: "",
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, { emit }) {
        const classes = computed(() => `base-tab-adaptive ${props.active ? "active-tab" : ""} ${props.class}`);

        function clickHandler() {
            emit("onClick");
        }

        return { classes, clickHandler, COLORS };
    },
});
</script>
