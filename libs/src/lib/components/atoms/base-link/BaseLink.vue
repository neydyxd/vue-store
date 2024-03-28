<template>
    <div :class="classes">
        <svg-sprite v-if="iconPrefix" class="prefix-icon" symbol="map" />

        <router-link v-if="to" :to="to"><slot></slot></router-link>
        <a v-else :target="isOpenNewTab ? '_blank' : '_self'" :href="href"><slot></slot></a>

        <svg-sprite v-if="iconSuffix" class="suffix-icon" :symbol="iconSuffix" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { SvgSprite } from "vue-svg-sprite";

import "./theme.scss";

export default defineComponent({
    name: "BaseLink",
    components: { SvgSprite },
    props: {
        to: String,
        iconPrefix: String,
        iconSuffix: String,
        href: {
            type: String,
            default: "",
        },
        class: {
            type: String,
            default: "",
        },
        isOpenNewTab: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const classes = computed<string>(() => `base-link ${props.class}`);

        return {
            classes,
        };
    },
});
</script>
