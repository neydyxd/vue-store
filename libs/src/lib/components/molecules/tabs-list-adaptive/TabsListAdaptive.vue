<template>
    <div :class="classes">
        <base-tab-adaptive
            v-for="(tab, index) in tabs"
            :key="index"
            :active="activeTab === tab.value"
            @onClick="() => clickHandler(tab.value)"
            >{{ tab.label }}</base-tab-adaptive
        >
    </div>
</template>

<script lang="ts">
import BaseTabAdaptive from "@/components/atoms/base-tab-adaptive/BaseTabAdaptive.vue";
import { TabsListAdaptive } from "@/components/molecules/tabs-list-adaptive/types";
import { PropType, computed, defineComponent, ref, watch } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "TabsListAdaptive",
    components: { BaseTabAdaptive },
    emits: ["clickHandler"],
    props: {
        class: {
            type: String,
            default: "",
        },
        tabs: {
            type: Array as PropType<TabsListAdaptive[]>,
            required: true,
        },
        currentTab: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const activeTab = ref<string>(props.currentTab);

        const classes = computed(() => `tabs-list-adaptive ${props.class}`);

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

        return { classes, activeTab, clickHandler };
    },
});
</script>
