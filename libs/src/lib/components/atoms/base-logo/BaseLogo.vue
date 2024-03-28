<template>
    <router-link to="/" :class="classes">
        <v-img src="@/assets/logotype.svg" alt="спортмастер"></v-img>
    </router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "BaseLogo",
    props: {
        class: {
            type: String,
            default: "logo",
        },
    },
    setup(props) {
        const classes = computed(() => `logo ${props.class}`);
        return { classes };
    },
});
</script>
