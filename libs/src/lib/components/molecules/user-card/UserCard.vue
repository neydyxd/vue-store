<template>
    <div :class="classes">
        <div class="user-card__header">
            <div class="user-card__avatar" :style="avatarStyles" />
            <div class="user-card__personal-info">
                <title-adaptive as="h4">{{ data.fullName }}</title-adaptive>
                <text-adaptive size="14" :color="COLORS.BRAND_PRIMARY">{{ data.position }}</text-adaptive>
            </div>
        </div>

        <div class="user-card__contacts">
            <div class="user-card__contact">
                <base-link href="tel:8 800 454-15-11">
                    <text-adaptive :color="COLORS.BLACK_PRIMARY" size="16" weight="medium">
                        8 800 454-15-11
                    </text-adaptive>
                </base-link>
                <text-adaptive size="12" :color="COLORS.BLACK_SECONDARY">Служба поддержки</text-adaptive>
            </div>
            <div class="user-card__contact">
                <base-link href="mailto:support@sport.ru">
                    <text-adaptive :color="COLORS.BLACK_PRIMARY" size="16" weight="medium">
                        support@sport.ru
                    </text-adaptive>
                </base-link>
                <text-adaptive size="12" :color="COLORS.BLACK_SECONDARY">Служба поддержки</text-adaptive>
            </div>
        </div>

        <base-button variant="ghost"
            ><text-adaptive size="12" weight="medium" text-transform="uppercase" :color="COLORS.BRAND_PRIMARY"
                >Написать менеджеру в Telegram</text-adaptive
            ></base-button
        >
    </div>
</template>

<script lang="ts">
import BaseButton from "@/components/atoms/base-button/BaseButton.vue";
import BaseLink from "@/components/atoms/base-link/BaseLink.vue";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { IUserCardDataProps } from "@/components/molecules/user-card/types";
import { COLORS } from "@/modules/colors";
import { PropType, computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "UserCard",
    components: {
        BaseButton,
        BaseLink,
        TextAdaptive,
        TitleAdaptive,
    },
    props: {
        class: {
            type: String,
            default: "",
        },
        data: {
            type: Object as PropType<IUserCardDataProps>,
            required: true,
        },
    },
    setup(props) {
        const classes = computed<string>(() => `user-card ${props.class}`);
        const avatarStyles = computed(() => ({
            backgroundImage: `url(${props.data.avatar})`,
        }));

        return {
            classes,
            avatarStyles,
            COLORS,
        };
    },
});
</script>
