<template>
    <div class="grid-columns">
        <div v-for="(item, idx) in data" :key="idx" class="grid-columns__item">
            <div class="grid-columns__item-info">
                <title-adaptive as="h2" title-transform="uppercase">{{ item.title }}</title-adaptive>
                <text-adaptive size="18" type-text="subtitle" :color="COLORS.BLACK_SECONDARY">{{
                    item.description
                }}</text-adaptive>
            </div>
            <div class="grid-columns__item-image" :style="{ backgroundImage: `url(${item.src})` }" />
        </div>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { IGridColumnsDataProps } from "@/components/molecules/grid-columns/types";
import { COLORS } from "@/modules/colors";
import { PropType, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "GridColumns",
    components: {
        TextAdaptive,
        TitleAdaptive,
    },
    props: {
        data: {
            type: Array as PropType<IGridColumnsDataProps[]>,
            required: true,
        },
    },
    setup() {
        return {
            COLORS,
        };
    },
});
</script>
