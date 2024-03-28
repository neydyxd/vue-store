<template>
    <div class="card-filter-address card-filter">
        <!--        <div class="card-filter-address__logo">-->
        <!--            <img :src="cardFilterData.logo" alt="" />-->
        <!--        </div>-->

        <div class="card-filter-address__info">
            <title-adaptive as="h3">{{ cardFilterData.header }}</title-adaptive>
            <text-adaptive size="18" type-text="subtitle" :color="COLORS.BLACK_SECONDARY">{{
                cardFilterData.address
            }}</text-adaptive>
        </div>
        <div class="card-filter-address__show-map" @click="showOnMap(cardFilterData, $event)">
            <base-link icon-prefix="map"
                ><text-adaptive size="14" weight="medium" type-text="special-link" :color="COLORS.BRAND_PRIMARY"
                    >посмотреть на карте</text-adaptive
                ></base-link
            >
        </div>

        <div class="card-filter-address__contact">
            <title-adaptive class="card-filter-address__contact-phone" as="h5" title-transform="uppercase">
                {{ cardFilterData.phone }}
            </title-adaptive>
            <text-adaptive size="14" type-text="subtitle" :color="COLORS.BLACK_SECONDARY">{{
                cardFilterData.email
            }}</text-adaptive>
        </div>
    </div>
</template>

<script lang="ts">
import BaseLink from "@/components/atoms/base-link/BaseLink.vue";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { ICardShopsFilterData } from "@/components/molecules/card-filter/cards/address/types";
import { COLORS } from "@/modules/colors";
import { PropType, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "CardFilterAddress",
    components: {
        BaseLink,
        TextAdaptive,
        TitleAdaptive,
    },
    props: {
        cardFilterData: {
            type: Object as PropType<ICardShopsFilterData>,
            required: true,
        },
    },
    setup(_, { emit }) {
        const showOnMap = (shop: ICardShopsFilterData, event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            emit("onShowMap", shop);
        };

        return { COLORS, showOnMap };
    },
});
</script>
