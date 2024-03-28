<template>
    <component :is="cardFilterComponents[cardType]" :cardFilterData="cardFilterData" />
</template>

<script lang="ts">
import CardFilterAddress from "@/components/molecules/card-filter/cards/address/CardFilterAddress.vue";
import { ICardShopsFilterData } from "@/components/molecules/card-filter/cards/address/types";
import CardFilterContacts from "@/components/molecules/card-filter/cards/contacts/CardFilterContacts.vue";
import { EmployeeDto } from "@/modules/interfaces/EmployeeDto";
import { Component, PropType, defineComponent } from "vue";

import "./theme.scss";

type CardFilterTypesType = "address" | "contacts";
type CardFilterComponentsType = Record<CardFilterTypesType, Component>;
type CardFilterDataPropsType = ICardShopsFilterData | EmployeeDto;

const cardFilterComponents: CardFilterComponentsType = {
    address: CardFilterAddress,
    contacts: CardFilterContacts,
};

export default defineComponent({
    name: "CardFilter",
    props: {
        cardType: {
            type: String as PropType<CardFilterTypesType>,
            required: true,
        },
        cardFilterData: {
            type: Object as PropType<CardFilterDataPropsType>,
            required: true,
        },
    },
    setup() {
        return { cardFilterComponents };
    },
});
</script>
