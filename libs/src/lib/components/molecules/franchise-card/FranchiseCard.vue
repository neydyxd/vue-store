<template>
    <div :class="classes" :style="franchisePict">
        <div class="franchise-card__info">
            <img class="franchise-card__logo" :src="data.src" alt="" />
            <text-adaptive
                size="14"
                class="franchise-card__description"
                v-html="data.franchiseDescription"
            ></text-adaptive>

            <div class="franchise-card__parameter">
                <div class="franchise-card__size">
                    <svg-sprite symbol="franchise-coop-size-white" />
                    <title-adaptive as="h5" title-transform="uppercase">
                        {{ data.franchiseSize }}
                    </title-adaptive>
                </div>
                <div class="franchise-card__size">
                    <svg-sprite symbol="franchise-coop-type-white" />

                    <title-adaptive as="h5" title-transform="uppercase">
                        {{ data.franchiseType }}
                    </title-adaptive>
                </div>
                <!--                <div class="franchise-card__size">-->
                <!--                    <svg-sprite symbol="franchise-coop-label-white" />-->

                <!--                    <title-adaptive as="h5" title-transform="uppercase">{{ data.franchiseLabel }}</title-adaptive>-->
                <!--                </div>-->
            </div>
            <text-adaptive size="14" type-text="subtitle" :color="COLORS.SPECIAL_WHITE">Объем инвестиций</text-adaptive>
            <title-adaptive class="franchise-card__investments" weight="medium" as="h3"
                >{{ data.franchiseInvestments }} ₽</title-adaptive
            >

            <base-button @on-click="() => $router.push(franchiseLink)"
                ><text-adaptive weight="medium" :color="COLORS.SPECIAL_WHITE" type-text="special-button" size="12"
                    >Подробнее</text-adaptive
                ></base-button
            >

            <base-link class="franchise-card__link" :to="orderLink"
                ><text-adaptive :color="COLORS.SPECIAL_WHITE" weight="medium" size="12" type-text="special-button"
                    >Оставить заявку</text-adaptive
                ></base-link
            >
        </div>
    </div>
</template>

<script lang="ts">
import BaseButton from "@/components/atoms/base-button/BaseButton.vue";
import BaseLink from "@/components/atoms/base-link/BaseLink.vue";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { FranchiseCardDataProps } from "@/components/molecules/franchise-card/types";
import { environment } from "@/environments/environment";
import { COLORS } from "@/modules/colors";
import { PropType, computed, defineComponent } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "FranchiseCard",
    components: { BaseLink, BaseButton, SvgSprite, TextAdaptive, TitleAdaptive },
    props: {
        class: {
            type: String,
            default: "",
        },
        data: {
            type: Object as PropType<FranchiseCardDataProps>,
            required: true,
        },
    },
    setup(props) {
        const classes = computed(() => `franchise-card ${props.class}`);

        const franchiseLink = computed(() => (props.data.franchiseName === "СМ Мини" ? "/smmini" : props.data.link));

        const orderLink = computed(() =>
            props.data.franchiseName === "СМ Мини" ? "/smmini#form-cooperation" : "/cooperation#form-cooperation",
        );

        const franchisePict = computed(() => ({
            backgroundImage: `url(${props.data.pict})`,
            backgroundSize: "cover",
        }));

        return { classes, franchisePict, franchiseLink, orderLink, COLORS, environment };
    },
});
</script>
