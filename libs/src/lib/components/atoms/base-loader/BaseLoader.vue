<template>
    <div class="base-loader">
        <div class="base-loader__wrapper">
            <v-progress-circular :size="64" :width="6" indeterminate color="#1551E5" />

            <text-adaptive v-if="message" class="base-loader__message" size="12" weight="medium" v-html="message" />

            <div v-if="$slots['content']" class="base-loader__content-wrapper">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "@/components/atoms/text-adaptive/TextAdaptive.vue";
import { defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "BaseLoader",
    components: { TextAdaptive },
    props: {
        message: {
            type: String,
            default: "",
        },
    },
});
</script>
