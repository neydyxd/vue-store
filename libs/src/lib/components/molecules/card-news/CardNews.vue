<template>
    <div :class="classes">
        <div class="card-news__preview" :style="{ backgroundImage: `url(${data.src ? data.src : PlugMiniImg})` }"></div>

        <div class="card-news__info">
            <text-adaptive
                :size="cardNewsSizeConfig[cardSize].date.size"
                :type-text="cardNewsSizeConfig[cardSize].date.typeText"
                :color="COLORS.BLACK_SECONDARY"
                >{{ data.date }}</text-adaptive
            >

            <title-adaptive class="card-news__title" :as="cardNewsSizeConfig[cardSize].title.as">{{
                data.title
            }}</title-adaptive>

            <text-adaptive
                class="card-news__description"
                :size="cardNewsSizeConfig[cardSize].description.size"
                :type-text="cardNewsSizeConfig[cardSize].description.typeText"
                :color="COLORS.BLACK_PRIMARY"
                v-html="data.description"
            ></text-adaptive>

            <div class="card-news__link">
                <base-link :to="data.link"
                    ><text-adaptive
                        :size="cardNewsSizeConfig[cardSize].link.size"
                        :type-text="cardNewsSizeConfig[cardSize].link.typeText"
                        :color="COLORS.BRAND_PRIMARY"
                        weight="bold"
                        >Читать далее</text-adaptive
                    ></base-link
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import PlugMiniImg from "@/assets/image/plug-mini.png";
import BaseLink from "@/components/atoms/base-link/BaseLink.vue";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { cardNewsSizeConfig } from "@/components/molecules/card-news/helpers";
import { CardNewsTypeProps, ICardNewsProps } from "@/components/molecules/card-news/types";
import { CardNewsSizeTypes } from "@/components/molecules/card-news/types";
import { COLORS } from "@/modules/colors";
import { PropType, computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "CardNews",
    props: {
        data: {
            type: Object as PropType<ICardNewsProps>,
            required: true,
        },
        typeCard: {
            type: String as PropType<CardNewsTypeProps>,
            default: "vertical",
        },
        cardSize: {
            type: String as PropType<CardNewsSizeTypes>,
            default: "large",
        },
        isHtml: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        BaseLink,
        TextAdaptive,
        TitleAdaptive,
    },
    setup(props) {
        const classes = computed(() => `card-news ${props.typeCard} size-${props.cardSize}`);

        return {
            PlugMiniImg,
            classes,
            COLORS,
            cardNewsSizeConfig,
        };
    },
});
</script>
