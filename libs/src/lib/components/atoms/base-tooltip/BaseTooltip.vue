<template>
    <div class="base-tooltip" :class="classes">
        <text-adaptive :color="COLORS.SPECIAL_WHITE" size="12"><slot></slot></text-adaptive>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { COLORS } from "@/modules/colors";
import { computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "BaseTooltip",
    components: { TextAdaptive },
    props: {
        class: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const classes = computed(() => props.class);

        return {
            classes,
            COLORS,
        };
    },
});
</script>
