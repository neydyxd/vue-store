<template>
    <div :class="classes">
        <base-tab
            v-for="tab in tabs"
            :key="tab.value"
            :active="activeTab === tab.value"
            :icon-prefix="tab.icon"
            :variant="variant"
            @onClick="() => clickHandler(tab.value)"
            >{{ tab.label }}</base-tab
        >
    </div>
</template>

<script lang="ts">
import { VariantType } from "@/components/atoms/base-button/types";
import BaseTab from "@/components/atoms/base-tab/BaseTab.vue";
import { ITabsList } from "@/components/molecules/tabs-list/types";
import { PropType, computed, defineComponent, ref, watch } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "TabsList",
    components: { BaseTab },
    emits: ["clickHandler"],
    props: {
        class: {
            type: String,
            default: "",
        },
        tabs: {
            type: Array as PropType<ITabsList[]>,
            required: true,
        },
        variant: {
            type: String as PropType<VariantType>,
            default: "ghost",
        },
        currentTab: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const activeTab = ref<string>(props.currentTab);
        const classes = computed(() => `tabs-list ${props.class}`);

        function clickHandler(value: string) {
            activeTab.value = value;

            emit("clickHandler", activeTab.value);
        }

        watch(
            () => props.currentTab,
            (currValue: string) => {
                activeTab.value = currValue;
            },
        );

        return {
            classes,
            activeTab,

            clickHandler,
        };
    },
});
</script>
