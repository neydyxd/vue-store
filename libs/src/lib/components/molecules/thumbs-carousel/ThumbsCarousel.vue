<template>
    <div class="thumbs-carousel">
        <swiper
            :space-between="10"
            :loop="loop"
            :autoplay="autoPlay"
            :thumbs="{ swiper: thumbsRef }"
            :modules="modules"
            :navigation="{
                prevEl: prevEl,
                nextEl: nextEl,
            }"
            :initialSlide="initialSlide"
            class="thumbs-carousel__main-slider"
        >
            <swiper-slide v-for="(slider, idx) in slidersData" :key="idx">
                <div class="thumbs-carousel__template" :style="{ backgroundImage: `url(${slider})` }"></div
            ></swiper-slide>
        </swiper>

        <div class="thumbs-carousel__control">
            <div ref="prevEl">
                <button-icon variant="ghost" icon="arrow-left" />
            </div>

            <div :style="{ width: '100%' }">
                <swiper
                    :slides-per-view="3"
                    :space-between="17"
                    :loop="loop"
                    :autoplay="autoPlay"
                    :modules="modules"
                    :initialSlide="initialSlide"
                    :slidesPerGroup="slidesPerGroup"
                    class="thumbs-carousel__gallery-slider"
                    :watchSlidesProgress="true"
                    @swiper="setThumbsRef"
                >
                    <swiper-slide v-for="(slider, idx) in slidersData" :key="idx">
                        <div class="thumbs-carousel__template" :style="{ backgroundImage: `url(${slider})` }"></div
                    ></swiper-slide>
                </swiper>
            </div>

            <div ref="nextEl">
                <button-icon variant="ghost" icon="arrow-right" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ButtonIcon from "@/components/atoms/button-icon/ButtonIcon.vue";
import { Navigation, Thumbs } from "swiper";
import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/vue";
import { PropType, computed, defineComponent, ref } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "ThumbsCarousel",
    components: { ButtonIcon, Swiper, SwiperSlide },
    props: {
        slidersData: {
            type: Array as PropType<string[]>,
            required: true,
        },
        slidersPerView: {
            type: [Number, String] as PropType<number | "auto">,
            default: 1,
        },
        loop: {
            type: Boolean,
            default: false,
        },
        autoPlay: {
            type: Boolean,
            default: false,
        },
        isLastSlide: {
            type: Boolean,
            default: false,
        },
        slidesPerGroup: {
            type: Number,
            default: 1,
        },
    },
    setup(props) {
        const prevEl = ref(null);
        const nextEl = ref(null);

        const thumbsRef = ref<SwiperClass | null>(null);

        function setThumbsRef(swiper: SwiperClass) {
            thumbsRef.value = swiper;
        }

        const initialSlide = computed(() => (props.isLastSlide ? props.slidersData.length : 0));

        return {
            modules: [Navigation, Thumbs],
            prevEl,
            nextEl,
            thumbsRef,
            initialSlide,

            setThumbsRef,
        };
    },
});
</script>
