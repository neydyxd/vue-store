<template>
    <transition name="base-modal">
        <div v-if="isShowModal" class="base-modal" :class="classes" @click="() => $emit('closeModal')">
            <div class="base-modal__wrapper" @click.stop>
                <div class="base-modal__content">
                    <svg-sprite v-if="isCloseIcon" symbol="close" class="close" @click="() => $emit('closeModal')" />
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseModal",
    components: { SvgSprite },
    emits: ["closeModal"],
    props: {
        class: {
            type: String,
            default: "",
        },
        isShowModal: {
            type: Boolean,
            required: true,
        },
        isCloseIcon: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        const classes = computed(() => `${props.class}`);

        onMounted(() => {
            document.documentElement.style.overflow = props.isShowModal ? "hidden" : "auto";
        });

        onBeforeUnmount(() => {
            document.documentElement.style.overflow = "auto";
        });

        return {
            classes,
        };
    },
});
</script>
