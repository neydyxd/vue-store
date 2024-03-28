<template>
    <div :class="classes">
        <div v-if="label" class="select-carousel__label">
            <text-adaptive size="14">{{ label }}</text-adaptive>
        </div>

        <div class="select-carousel__wrapper">
            <div ref="prev">
                <button-icon variant="ghost" icon="arrow-left" :disabled="currSlide.value === items[0].value" />
            </div>

            <carousel
                :prev-ref="prev"
                :next-ref="next"
                :sliders="items"
                :is-last-slide="isLastSlide"
                @navigationPrev="prevHandler"
                @navigationNext="nextHandler"
            >
                <template v-slot="slotProps">
                    <div class="carousel__select">
                        <text-adaptive size="14">{{ slotProps?.item.label }}</text-adaptive>
                    </div>
                </template>
            </carousel>

            <div ref="next">
                <button-icon
                    variant="ghost"
                    icon="arrow-right"
                    :disabled="currSlide.value === items[items.length - 1].value"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ButtonIcon from "@/components/atoms/button-icon/ButtonIcon.vue";
import { ISelectCarousel } from "@/components/atoms/select-carousel/types";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import Carousel from "@/components/molecules/carousel/Carousel.vue";
import { Swiper as SwiperClass } from "swiper/types";
import { PropType, computed, defineComponent, ref } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "SelectCarousel",
    components: { TextAdaptive, Carousel, ButtonIcon },
    emits: ["prevHandle", "nextHandle", "slideChange"],
    props: {
        class: {
            types: String,
            default: "",
        },
        label: {
            type: String,
        },
        items: {
            type: Array as PropType<ISelectCarousel[]>,
            required: true,
        },
        isLastSlide: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const classes = computed(() => `${props.class} select-carousel`);
        const currSlide = ref<ISelectCarousel>(
            props.isLastSlide ? props.items[props.items.length - 1] : props.items[0],
        );

        const prev = ref<HTMLDivElement | null>(null);
        const next = ref<HTMLDivElement | null>(null);

        const prevHandler = (swiper: SwiperClass) => {
            currSlide.value = props.items[swiper.activeIndex];
            emit("prevHandle", currSlide.value.value);
        };

        const nextHandler = (swiper: SwiperClass) => {
            currSlide.value = props.items[swiper.activeIndex];
            emit("nextHandle", currSlide.value.value);
        };

        return {
            prev,
            next,
            classes,
            currSlide,

            nextHandler,
            prevHandler,
        };
    },
});
</script>
