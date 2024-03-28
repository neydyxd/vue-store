<template>
    <transition name="alert-modal">
        <base-modal :is-show-modal="isShowModal" class="alert-modal" @close-modal="hideModal">
            <div class="alert-modal__wrapper" :class="classes">
                <div class="alert-modal__header">
                    <title-adaptive :as="isDesktopSize(sizeType) ? 'h2' : 'h4'" title-transform="uppercase">{{
                        title
                    }}</title-adaptive>
                    <text-adaptive type-text="subtitle" size="14" :color="COLORS.BLACK_SECONDARY">{{
                        description
                    }}</text-adaptive>
                </div>

                <div class="alert-modal__controls">
                    <base-button @click="hideModal"
                        ><text-adaptive type-text="special-button" size="12">{{
                            primaryBtnText
                        }}</text-adaptive></base-button
                    >
                </div>
            </div>
        </base-modal>
    </transition>
</template>

<script lang="ts">
import BaseButton from "../../atoms/base-button/BaseButton.vue";
import BaseModal from "../../atoms/base-modal/BaseModal.vue";
import TextAdaptive from "../../atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "../../atoms/title-adaptive/TitleAdaptive.vue";
import { COLORS } from "../../../modules/colors";
import { SCREEN_TYPE } from "@/modules/screen";
import { isDesktopSize } from "@/utils/screen-utils";
import { PropType, Ref, computed, defineComponent, inject } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "AlertModal",
    components: { BaseModal, BaseButton, TextAdaptive, TitleAdaptive },
    props: {
        class: {
            type: String,
        },
        isShowModal: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        positionTitleContent: {
            type: String as PropType<"center" | "left" | "right">,
            default: "center",
        },
        primaryBtnText: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const sizeType = inject<Ref<SCREEN_TYPE>>("sizeType");

        const classes = computed(() => `position-${props.positionTitleContent} ${props.class}`);

        const hideModal = () => {
            emit("update:isShowModal", false);
        };

        return {
            sizeType,
            isDesktopSize,

            classes,
            COLORS,
            hideModal,
        };
    },
});
</script>
