<template>
    <base-modal :is-show-modal="isShowModal" :class="classes" @close-modal="() => $emit('closeModal')">
        <div class="confirm-modal__wrapper">
            <div class="confirm-modal__header">
                <title-adaptive :as="isDesktopSize(sizeType) ? 'h2' : 'h4'" title-transform="uppercase"
                    >{{ title }}
                </title-adaptive>

                <text-adaptive v-if="description" size="14" type-text="subtitle" :color="COLORS.BLACK_SECONDARY">{{
                    description
                }}</text-adaptive>
            </div>

            <div v-if="$slots.default" class="confirm-modal__content">
                <slot></slot>
            </div>

            <div class="confirm-modal__btn">
                <base-button @onClick="() => $emit('mainBtnClickHandler')"
                    ><text-adaptive type-text="special-button" weight="medium" size="12">{{
                        mainBtnText
                    }}</text-adaptive></base-button
                >

                <base-button variant="ghost" @onClick="() => $emit('secondaryBtnClickHandler')"
                    ><text-adaptive type-text="special-button" weight="medium" size="12">{{
                        secondaryBtnText
                    }}</text-adaptive></base-button
                >
            </div>
        </div>
    </base-modal>
</template>

<script lang="ts">
import BaseButton from "@/components/atoms/base-button/BaseButton.vue";
import BaseModal from "@/components/atoms/base-modal/BaseModal.vue";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { COLORS } from "@/modules/colors";
import { SCREEN_TYPE } from "@/modules/screen";
import { isDesktopSize } from "@/utils/screen-utils";
import { PropType, Ref, computed, defineComponent, inject } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "ConfirmModal",
    components: { BaseButton, TextAdaptive, TitleAdaptive, BaseModal },
    emits: ["closeModal", "mainBtnClickHandler", "secondaryBtnClickHandler"],
    props: {
        class: {
            type: String,
            default: "",
        },
        isShowModal: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: String,
        mainBtnText: {
            type: String,
            required: true,
        },
        secondaryBtnText: {
            type: String,
            required: true,
        },
        positionHeader: {
            type: String as PropType<"left" | "center" | "right">,
            default: "left",
        },
    },
    setup(props) {
        const sizeType = inject<Ref<SCREEN_TYPE>>("sizeType");

        const classes = computed(() => `confirm-modal position-header-${props.positionHeader} ${props.class}`);
        return { COLORS, classes, sizeType, isDesktopSize };
    },
});
</script>
