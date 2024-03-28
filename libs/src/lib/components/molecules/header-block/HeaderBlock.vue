<template>
    <div class="header-block">
        <title-adaptive title-transform="uppercase" :as="asTitle">{{ title }}</title-adaptive>
        <text-adaptive
            v-if="description"
            class="header-block__title-description"
            :type-text="typeText"
            :size="sizeDescription"
            v-html="description"
        >
        </text-adaptive>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { SizeType as TextSizeType, TypeText } from "@/components/atoms/text-adaptive/types";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { AsType as TitleAsType } from "@/components/atoms/title-adaptive/types";
import { COLORS } from "@/modules/colors";
import { PropType, computed, defineComponent, ref } from "vue";

import "./theme.scss";

type TitlePositionType = "left" | "center" | "right";

export default defineComponent({
    name: "HeaderBlock",
    components: { TextAdaptive, TitleAdaptive },
    props: {
        class: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            required: true,
        },
        typeText: {
            type: String as PropType<TypeText>,
            default: "subtitle",
        },
        description: {
            type: String,
        },
        titlePosition: {
            type: String as PropType<TitlePositionType>,
            default: "left",
        },
        asTitle: {
            type: String as PropType<TitleAsType>,
            default: "h2",
        },
        sizeDescription: {
            type: String as PropType<TextSizeType>,
            default: "18",
        },
    },
    setup(props) {
        const prev = ref<HTMLDivElement | null>(null);
        const next = ref<HTMLDivElement | null>(null);

        const classes = computed<string>(() => `header-block ${props.class} title-position-${props.titlePosition}`);

        return {
            classes,
            prev,
            next,
            COLORS,
        };
    },
});
</script>
