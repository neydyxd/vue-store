<template>
    <div class="base-chips">
        <text-adaptive size="12" weight="medium" :color="COLORS.BRAND_PRIMARY"><slot></slot></text-adaptive>

        <button type="button" @click="clickHandler">
            <svg-sprite :symbol="isDownload ? 'download' : 'close'" />
        </button>
    </div>
</template>

<script lang="ts">
import TextAdaptive from "../text-adaptive/TextAdaptive.vue";
import { COLORS } from "../../../modules/colors";
import { defineComponent } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseChips",
    components: { SvgSprite, TextAdaptive },
    emits: ["clickHandler"],
    props: {
        value: {
            type: String,
            required: true,
        },
        isDownload: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        function clickHandler() {
            emit("clickHandler", props.value);
        }
        return { COLORS, clickHandler };
    },
});
</script>
