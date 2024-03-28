<template>
    <transition name="warning-modal">
        <modal-template>
            <div v-if="isShowModal" class="warning-modal" :class="classes">
                <div class="warning-modal__title-wrapper">
                    <title-adaptive as="h2" title-transform="uppercase">{{ title }}</title-adaptive>
                    <text-adaptive type-text="subtitle" size="14" :color="COLORS.BLACK_SECONDARY">{{
                        description
                    }}</text-adaptive>
                </div>

                <div class="warning-modal__content-wrapper">
                    <base-button
                        ><text-adaptive type-text="special-button" size="12">{{
                            primaryBtnText
                        }}</text-adaptive></base-button
                    >
                    <base-button
                        ><text-adaptive type-text="special-button" size="12">{{
                            secondaryBtnText
                        }}</text-adaptive></base-button
                    >
                </div>
            </div>
        </modal-template>
    </transition>
</template>

<script lang="ts">
import BaseButton from "@/components/atoms/base-button/BaseButton.vue";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import ModalTemplate from "@/components/templates/modal-template/ModalTemplate.vue";
import { COLORS } from "@/modules/colors";
import { PropType, computed, defineComponent } from "vue";

export default defineComponent({
    name: "WarningModal",
    components: { ModalTemplate, BaseButton, TextAdaptive, TitleAdaptive },
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
        secondaryBtnText: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const classes = computed(() => `position-${props.positionTitleContent} ${props.class}`);

        return {
            classes,
            COLORS,
        };
    },
});
</script>
