<template>
    <div :class="classes">
        <div
            class="base-file-uploader__dropzone-container"
            @dragover.prevent="dragover"
            @drop.prevent="drop"
            @dragleave="dragleave"
        >
            <input
                type="file"
                :multiple="multiple"
                :name="name"
                :id="id"
                class="base-file-uploader__hidden-input"
                ref="inputFile"
                :accept="acceptFormat"
                @change="onChange"
            />

            <label :for="id" class="base-file-uploader__file-label">
                <div class="base-file-uploader__uploader">
                    <svg-sprite :symbol="generalInfo.icon" />
                </div>
            </label>

            <div class="base-file-uploader__wrapper">
                <title-adaptive as="h5">{{ generalInfo.title }}</title-adaptive>
                <text-adaptive :color="COLORS.BLACK_SECONDARY" size="14" class="base-file-uploader__info">{{
                    generalInfo.description
                }}</text-adaptive>
            </div>
        </div>

        <base-tag v-if="isError || validationError" variant="danger">{{ errorMessage || validationError }}</base-tag>

        <div v-if="messages" class="base-file-uploader__messages">
            <svg-sprite symbol="annotations" />
            <text-adaptive size="12" :color="COLORS.BLACK_SECONDARY">{{ messages }}</text-adaptive>
        </div>

        <div v-if="files.length" class="base-file-uploader__files">
            <title-adaptive as="h5">Список загруженных файлов</title-adaptive>

            <div class="base-file-uploader__file-wrapper">
                <div v-for="file in files" :key="file.name" class="base-file-uploader__file">
                    <text-adaptive weight="medium" size="12" :color="COLORS.BRAND_PRIMARY">{{
                        makeName(file.name)
                    }}</text-adaptive>

                    <button-icon
                        class="trash-icon"
                        icon="trash"
                        variant="ghost"
                        @click-handler="() => remove(files.indexOf(file))"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { AcceptPropTypes, GeneralInfo } from "./types";
import BaseTag from "../base-tag/BaseTag.vue";
import ButtonIcon from "../button-icon/ButtonIcon.vue";
import TextAdaptive from "../text-adaptive/TextAdaptive.vue";
import TitleAdaptive from "../title-adaptive/TitleAdaptive.vue";
import { COLORS } from "../../../modules/colors";
import { useField } from "vee-validate";
import { PropType, computed, defineComponent, ref } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseFileUploader",
    components: { BaseTag, ButtonIcon, TextAdaptive, SvgSprite, TitleAdaptive },
    emits: ["onChange"],
    props: {
        generalInfo: {
            type: Object as PropType<GeneralInfo>,
            required: true,
        },
        class: {
            type: String,
            default: "",
        },
        id: {
            type: String,
            default: "fileInput",
        },
        name: {
            type: String,
            default: "file",
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        accept: {
            type: Array as PropType<AcceptPropTypes>,
            required: true,
        },
        size: {
            type: Number,
            default: 4,
        },
        messages: String,
    },
    setup(props, { emit }) {
        const isDragging = ref<boolean>(false);
        const files = ref<File[]>([]);
        const inputFile = ref<HTMLInputElement | null>(null);

        const isError = ref<boolean>(false);
        const errorMessage = ref<string>();

        const classes = computed(
            () => `base-file-uploader ${props.class} ${isError.value || validationError.value ? "has-error" : ""}`,
        );
        const acceptFormat = (props.accept as AcceptPropTypes).join(",");

        const { errorMessage: validationError, resetField } = useField(() => props.name, undefined, {
            initialValue: files.value,
        });

        function checkSize(fileSize: number) {
            return fileSize <= props.size * 1024 * 1024;
        }

        function onChange() {
            isError.value = false;
            errorMessage.value = "";
            resetField();

            files.value = [];

            Object.keys((inputFile.value as HTMLInputElement).files as FileList).forEach((file, index) => {
                if (!props.multiple && index >= 1) {
                    isError.value = true;
                    errorMessage.value = "Ошибка! Допустима загрузка не более одного файла";

                    return;
                }

                const innerFile: File = ((inputFile.value as HTMLInputElement).files as FileList)[index];

                const validSize = checkSize(innerFile.size);

                if (!validSize) {
                    isError.value = true;
                    errorMessage.value = "Ошибка! Размер файла превышает допустимый размер";

                    return;
                }

                files.value.push(innerFile);

                emit("onChange", files.value);
            });
        }

        function dragover() {
            isDragging.value = true;
        }
        function dragleave() {
            isDragging.value = false;
        }
        function drop(event: DragEvent) {
            (inputFile.value as HTMLInputElement).files = (event.dataTransfer as DataTransfer).files;
            onChange();
            isDragging.value = false;
        }

        function remove(index: number) {
            files.value.splice(index, 1);

            if (!files.value.length) {
                isError.value = false;
                errorMessage.value = "";
            }

            emit("onChange", files.value);
        }

        function makeName(nameFile: string) {
            if (nameFile.length >= 40) {
                const nameData = nameFile.split(".");
                const name = nameData
                    .slice(1, nameData.length - 1)
                    .join(".")
                    .substring(0, 40);

                const extension = nameFile.split(".")[nameFile.split(".").length - 1];
                return `${name}...${extension}`;
            }

            return nameFile;
        }

        return {
            classes,
            inputFile,
            isDragging,
            files,
            acceptFormat,
            COLORS,
            validationError,

            isError,
            errorMessage,

            dragover,
            dragleave,
            drop,
            onChange,
            remove,
            makeName,
        };
    },
});
</script>
