<template>
    <div class="adaptive-image">
        <picture>
            <source
                v-for="(source, index) in data.sources"
                :key="index"
                :type="source?.type || AdaptiveImageSourceType.IMAGE_JPEG"
                :srcset="source.srcset"
                :media="source.media"
            />

            <img
                class="adaptive-image__img"
                :src="data.src"
                :alt="data.alt || 'empty'"
                :loading="isLazy ? 'lazy' : 'eager'"
            />
        </picture>
    </div>
</template>

<script lang="ts">
import { AdaptiveImageData, AdaptiveImageSourceType } from "./types";
import { PropType, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "AdaptiveImg",
    props: {
        data: {
            type: Object as PropType<AdaptiveImageData>,
            required: true,
        },
        isLazy: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        return { AdaptiveImageSourceType };
    },
});
</script>
