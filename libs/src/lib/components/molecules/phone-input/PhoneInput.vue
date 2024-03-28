<template>
    <div class="phone-input">
        <label v-if="label">
            <text-adaptive size="14" type-text="special-label">
                {{ label }}
            </text-adaptive>
        </label>

        <div class="phone-input__wrapper">
            <vue-tel-input :inputOptions="inputOptions" @country-changed="countryChanged" customValidate />

            <base-input
                name="phone"
                :placeholder="getPlaceholder"
                :value="phone"
                :mask-data="getMaskData"
                @on-change="(value) => (phone = value)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import BaseInput from "@/components/atoms/base-input/BaseInput.vue";
import { MaskPhoneData } from "@/components/atoms/base-input/types";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { CountryObject } from "@/components/molecules/phone-input/types";
import { computed, defineComponent, ref, watch } from "vue";
import { VueTelInput, VueTelInputProps } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

import phoneMasks from "./phoneMasks.json";
import "./theme.scss";

export default defineComponent({
    name: "PhoneInput",
    emits: ["changePhoneLength"],
    components: { TextAdaptive, BaseInput, VueTelInput },
    props: {
        placeholder: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            default: "phone",
        },
    },
    setup(props, { emit }) {
        const phone = ref<string>("");
        const countryObject = ref<CountryObject>();
        const phoneLength = ref<number>();

        const inputOptions = computed<Partial<VueTelInputProps>>(() => ({
            defaultCountry: "RU",
            disabled: props.disabled,
        }));

        const getPlaceholder = computed<string>(() => `+${countryObject.value?.dialCode || ""}`);

        const getMaskData = computed<MaskPhoneData>(() => ({
            type: "phone",
            data: {
                dialCode: countryObject.value ? countryObject.value?.dialCode : "",
                mask: countryObject.value ? phoneMasks[countryObject.value?.iso2] : "",
            },
        }));

        function countryChanged(countryObjectValue: CountryObject) {
            phoneLength.value = phoneMasks[countryObjectValue.iso2].replace(/[^#]/g, "").length;

            countryObject.value = countryObjectValue;
            phone.value = "";
        }

        watch(phoneLength, () => {
            emit("changePhoneLength", phoneLength.value);
        });

        return { phone, getPlaceholder, countryChanged, inputOptions, getMaskData };
    },
});
</script>
