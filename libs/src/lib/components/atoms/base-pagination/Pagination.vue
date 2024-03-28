<template>
    <div v-if="totalPages > 1" class="base-pagination">
        <button-icon
            class="pagination-arrow-control prev-pagination-button"
            :class="`pagination-arrow-control-size-${size}`"
            icon="arrow-left"
            variant="ghost"
            @click-handler="() => clickPaginationArrowHandler('prev')"
        />
        <base-button
            v-for="page in paginationList"
            :key="page"
            class="pagination-page"
            :class="page === pageState ? 'page-active' : ''"
            variant="ghost"
            :size="size"
            @click="() => setPage(page)"
        >
            <text-adaptive
                size="15"
                weight="extrabold"
                :color="page === pageState ? COLORS.BRAND_PRIMARY : COLORS.BLACK_PRIMARY"
                >{{ page }}</text-adaptive
            >
        </base-button>
        <button-icon
            class="pagination-arrow-control prev-pagination-button"
            :class="`pagination-arrow-control-size-${size}`"
            icon="arrow-right"
            variant="ghost"
            @click-handler="() => clickPaginationArrowHandler('next')"
        />
    </div>
</template>

<script lang="ts">
import BaseButton from "@/components/atoms/base-button/BaseButton.vue";
import ButtonIcon from "@/components/atoms/button-icon/ButtonIcon.vue";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { COLORS } from "@/modules/colors";
import { PropType, defineComponent, ref, watch } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "BasePagination",
    components: { ButtonIcon, TextAdaptive, BaseButton },
    emits: ["changePageHandler"],
    props: {
        page: {
            type: Number,
            default: 1,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        size: {
            type: String as PropType<"medium" | "small" | "extra-small">,
            default: "medium",
        },
        maxShownQuantityPages: {
            type: Number,
            default: 5,
        },
    },
    setup(props, { emit }) {
        const pageArray = ref<number[]>([...Array(props.totalPages).keys()].map((page) => page + 1));

        const pageState = ref<number>(props.page);
        const paginationList = ref<number[]>(pageArray.value);

        function filterPaginationList() {
            paginationList.value = pageArray.value.filter((page) => {
                // Если находимся на первой странице, отступ в шагаз пагинации не делает,
                // отображаем первые 5 элементов
                if (pageState.value === 1) {
                    return page <= props.maxShownQuantityPages;
                }

                // Если находимся на последних пяти страницах, делаем вывод последних пяти элементов, без шага
                if (pageState.value >= props.totalPages - (props.maxShownQuantityPages - 2)) {
                    return page >= props.totalPages - (props.maxShownQuantityPages - 1);
                }

                // Если находимся на страницах больше 1ой или меньше 20й, фильтруем списком с шагом:
                // 1 страница до выбранной, 3 страницы после выбранной
                if (pageState.value > 1) {
                    return (
                        page === pageState.value - 1 ||
                        page === pageState.value ||
                        (page > pageState.value && page <= pageState.value + props.maxShownQuantityPages - 2)
                    );
                }
            });
        }

        function setPage(page: number) {
            pageState.value = page;
            emit("changePageHandler", pageState.value);
        }

        function clickPaginationArrowHandler(type: "prev" | "next") {
            if (type === "prev" && pageState.value === 1) return;
            if (type === "next" && pageState.value === props.totalPages) return;

            if (type === "prev") pageState.value = pageState.value - 1;
            else pageState.value = pageState.value + 1;

            emit("changePageHandler", pageState.value);
        }

        watch([pageState, pageArray], () => {
            filterPaginationList();
        });

        watch(
            () => [props.totalPages, props.page],
            (value, oldValue) => {
                if (value !== oldValue) {
                    pageArray.value = [...Array(props.totalPages).keys()].map((page) => page + 1);
                    pageState.value = props.page;
                }
            },
        );

        filterPaginationList();

        return {
            paginationList,
            pageState,
            COLORS,

            setPage,
            clickPaginationArrowHandler,
        };
    },
});
</script>
