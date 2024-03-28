<template>
    <div class="base-accordion">
        <v-expansion-panels variant="accordion">
            <v-expansion-panel elevation="0">
                <v-expansion-panel-title expand-icon="mdi-chevron-down" collapse-icon="mdi-chevron-up">
                    <svg-sprite
                        v-if="data?.icon?.expandIconPrefix"
                        class="base-accordion__prefix-icon"
                        :symbol="data.icon.expandIconPrefix"
                    />
                    <text-adaptive weight="medium" size="12">{{ data.title }}</text-adaptive>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <base-link v-for="(link, index) in data.contentList" :href="link.value" :key="index"
                        ><text-adaptive size="14">{{ link.title }}</text-adaptive></base-link
                    >
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts">
import { IBaseAccordionDataProps } from "./types";
import BaseLink from "../base-link/BaseLink.vue";
import TextAdaptive from "../text-adaptive/TextAdaptive.vue";
import { PropType, defineComponent } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseAccordion",
    components: { SvgSprite, BaseLink, TextAdaptive },
    props: {
        data: {
            type: Object as PropType<IBaseAccordionDataProps>,
            required: true,
        },
    },
});
</script>
