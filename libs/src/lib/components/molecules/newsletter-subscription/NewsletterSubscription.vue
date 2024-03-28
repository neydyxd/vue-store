<template>
    <div :class="classes">
        <div class="newsletter-subscription__text">
            <title-adaptive as="h3">Подписка на рассылку</title-adaptive>
            <text-adaptive size="14" :color="COLORS.BLACK_SECONDARY" type-text="subtitle">
                Мы регулярно публикуем полезные материалы, о выходе которых будем вас информировать по почте.
            </text-adaptive>
        </div>
        <div class="newsletter-subscription__controls">
            <div class="newsletter-subscription__input">
                <base-input label="Адрес электронной почты" placeholder="Введите e-mail" name="email" />
            </div>
            <base-button @click="subscribe">
                <text-adaptive size="12" weight="medium" type-text="special-button">Подписаться</text-adaptive>
            </base-button>
        </div>
    </div>

    <alert-modal
        v-if="isAlertModalVisible"
        :isShowModal="isAlertModalVisible"
        @update:isShowModal="hiddenModal($event)"
        title="Спасибо за подписку"
        :description="getDescription()"
        primaryBtnText="Вернуться"
    />
</template>

<script lang="ts">
import { NewsService } from "@/api/_services/news/news.service";
import BaseButton from "@/components/atoms/base-button/BaseButton.vue";
import BaseInput from "@/components/atoms/base-input/BaseInput.vue";
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "@/components/atoms/title-adaptive/TitleAdaptive.vue";
import AlertModal from "@/components/molecules/alert-modal/alert-modal.vue";
import { EMAIL_REGEXP } from "@/components/organisms/form-registration/steps/default/helpers";
import { emptyFieldsErrors, typeFieldsErrors } from "@/constants/errors";
import { COLORS } from "@/modules/colors";
import { ISubscribe } from "@/modules/interfaces/Subscribe";
import { errorHandler } from "@/utils/errors-utils";
import { useForm } from "vee-validate";
import { computed, defineComponent, ref } from "vue";
import * as yup from "yup";

import "./theme.scss";

export default defineComponent({
    name: "NewsletterSubscription",
    components: {
        BaseButton,
        BaseInput,
        TextAdaptive,
        TitleAdaptive,
        AlertModal,
    },
    props: {
        class: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const isAlertModalVisible = ref(false);
        const classes = computed(() => `newsletter-subscription ${props.class}`);
        const email = ref("");
        const schema = yup.object().shape({
            email: yup
                .string()
                .trim()
                .matches(EMAIL_REGEXP, { message: typeFieldsErrors.email })
                .required(emptyFieldsErrors.email),
        });

        const cooperationForm = useForm({
            validationSchema: schema,
        });

        const isFormValid = computed(() => {
            const errors = cooperationForm.errors.value;
            return Object.keys(errors).length === 0;
        });

        const getDescription = () => {
            return `Теперь на вашу почту ${
                cooperationForm.values.email.length > 35
                    ? `${cooperationForm.values.email.substring(1, 35)}...`
                    : cooperationForm.values.email
            } будут приходить все свежие новости.`;
        };

        async function subscribe() {
            await cooperationForm.setTouched({
                email: true,
            });
            await cooperationForm.validate();

            if (isFormValid.value) {
                const formData: ISubscribe = {
                    header: "new",
                    email: cooperationForm.values.email,
                    subjectCode: "common",
                };
                try {
                    await NewsService.postNewsletterSubscription(formData);
                    isAlertModalVisible.value = true;
                } catch (error) {
                    errorHandler(error);
                }
            }
        }

        function hiddenModal(isHidden: boolean) {
            isAlertModalVisible.value = isHidden;
            cooperationForm.resetForm();
        }

        return {
            classes,
            COLORS,
            email,
            isAlertModalVisible,
            getDescription,
            subscribe,
            hiddenModal,
        };
    },
});
</script>
