<template>
    <div class="carousel">
        <swiper
            :slides-per-view="slidersPerView"
            :space-between="spaceBetween"
            :loop="loop"
            :autoplay="autoPlay"
            :navigation="{
                prevEl: prevRef,
                nextEl: nextRef,
            }"
            :modules="modules"
            :initialSlide="initialSlide"
            :slidesPerGroup="slidesPerGroup"
            :pagination="isPagination"
            @swiper="setRef"
            @navigationPrev="navigationPrev"
            @navigationNext="navigationNext"
            @slideChange="onSlideChange"
            @init="onSliderInit"
        >
            <swiper-slide v-for="(slider, idx) in sliders" :key="idx">
                <slot :item="slider" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts">
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/vue";
import { PropType, computed, defineComponent, ref, watch } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "Carousel",
    emits: ["slideChange", "navigationPrev", "navigationNext"],
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        sliders: {
            type: Array as PropType<Array<{ [key: string]: unknown }>>,
            required: true,
        },
        slidersPerView: {
            type: [Number, String] as PropType<number | "auto">,
            default: 1,
        },
        spaceBetween: {
            type: Number,
            default: 0,
        },
        loop: {
            type: Boolean,
            default: false,
        },
        autoPlay: {
            type: Boolean,
            default: false,
        },
        prevRef: {
            type: Element as PropType<HTMLDivElement | null>,
            default: null,
        },
        nextRef: {
            type: Element as PropType<HTMLDivElement | null>,
            default: null,
        },
        isLastSlide: {
            type: Boolean,
            default: false,
        },
        slidesPerGroup: {
            type: Number,
            default: 1,
        },
        pagination: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const swiperRef = ref<SwiperClass | null>(null);

        const initialSlide = computed(() => (props.isLastSlide ? props.sliders.length : 0));

        const isPagination = computed(() => {
            return props.pagination ? { clickable: true } : false;
        });

        watch(swiperRef, () => {
            if (swiperRef.value && props.nextRef && props.prevRef) {
                swiperRef.value.navigation.update();
            }
        });

        function navigationPrev(swiper: SwiperClass) {
            emit("navigationPrev", swiper);
        }

        function navigationNext(swiper: SwiperClass) {
            emit("navigationNext", swiper);
        }

        function onSlideChange(swiper: SwiperClass) {
            emit("slideChange", swiper);
        }

        function onSliderInit() {
            //Фикс, чтоб инициализировался с 1 слайда
            if (!props.isLastSlide && props.slidersPerView == 1) {
                setTimeout(() => {
                    if (swiperRef.value) {
                        swiperRef.value.slideTo(1);
                    }
                }, 0);
            }
        }

        function setRef(swiperInstance: SwiperClass) {
            swiperRef.value = swiperInstance;
        }

        return {
            modules: [Navigation, Pagination],
            initialSlide,
            isPagination,

            onSlideChange,
            setRef,
            navigationPrev,
            navigationNext,
            onSliderInit,
        };
    },
});
</script>
