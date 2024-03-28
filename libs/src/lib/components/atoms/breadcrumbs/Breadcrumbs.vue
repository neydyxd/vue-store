<template>
    <div class="breadcrumbs">
        <base-link v-for="(breadcrumb, idx) in routeList" :key="breadcrumb.id" :href="getRoutePath(breadcrumb)">
            <title-adaptive as="h5" :color="COLORS.BLACK_PRIMARY" title-transform="uppercase">
                {{ breadcrumb.header }} {{ isLastElement(routeList, idx) ? "" : "/" }}
            </title-adaptive>
        </base-link>
    </div>
</template>

<script lang="ts">
import BaseLink from "@/components/atoms/base-link/BaseLink.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { COLORS } from "@/modules/colors";
import { CatalogChain } from "@/modules/interfaces/CatalogChain";
import { PropType, defineComponent } from "vue";
import { useRoute } from "vue-router";

import "./theme.scss";

export default defineComponent({
    name: "Breadcrumbs",
    components: { TitleAdaptive, BaseLink },
    emits: ["customRoutePath"],
    props: {
        routeList: {
            type: Array as PropType<(CatalogChain & { formatPath?: string })[]>,
            required: true,
        },
        rootPath: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const route = useRoute();
        function isLastElement(list: CatalogChain[], currIdx: number) {
            return list.length === currIdx + 1;
        }

        function getRoutePath(routeData: CatalogChain & { formatPath?: string }): string {
            if (routeData.formatPath) return routeData.formatPath;

            return `/${props.rootPath}/${routeData.id}?${new URLSearchParams(
                route.query as { [key: string]: string },
            ).toString()}`;
        }

        return {
            isLastElement,
            COLORS,

            getRoutePath,
        };
    },
});
</script>
