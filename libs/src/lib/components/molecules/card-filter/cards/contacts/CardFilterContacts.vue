<template>
    <div class="card-filter-contacts card-filter">
        <div class="card-filter-contacts__wrapper">
            <div class="card-filter-contacts__avatar" :style="styles" />
            <div class="card-filter-contacts__info">
                <title-adaptive as="h3">{{ cardFilterData.header }}</title-adaptive>
                <text-adaptive size="14" type-text="subtitle" :color="COLORS.BLACK_SECONDARY"
                    >{{ cardFilterData.departments[0].countryHeader }},{{ cardFilterData.departments[0].header
                    }}<br />{{ cardFilterData.position }}</text-adaptive
                >
            </div>
        </div>

        <div class="card-filter-contacts__contact">
            <title-adaptive class="card-filter-contacts__contact-phone" as="h4">
                {{ cardFilterData.phone.toUpperCase() }}
                {{ cardFilterData.extensionPhone ? `доб. ${cardFilterData.extensionPhone.toUpperCase()}` : "" }}
            </title-adaptive>
            <text-adaptive type-text="subtitle" size="14" :color="COLORS.BLACK_SECONDARY">{{
                cardFilterData.email
            }}</text-adaptive>
        </div>
    </div>
</template>

<script lang="ts">
import noPicture from "@/assets/image/plug-mini.png";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import { environment } from "@/environments/environment";
import { COLORS } from "@/modules/colors";
import { EmployeeDto } from "@/modules/interfaces/EmployeeDto";
import { PropType, computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "CardFilterContacts",
    components: { TextAdaptive, TitleAdaptive },
    props: {
        cardFilterData: {
            type: Object as PropType<EmployeeDto>,
            required: true,
        },
    },
    setup(props) {
        const styles = computed(() => ({
            backgroundImage: props.cardFilterData.avatar
                ? `url(${environment.server_pictures_path()}/${props.cardFilterData.avatar})`
                : `url(${noPicture})`,
        }));

        return { COLORS, styles };
    },
});
</script>
