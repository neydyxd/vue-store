<template>
    <li class="navigation-item">
        <router-link :to="to">
            <slot></slot>
        </router-link>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "NavigationItem",
    props: {
        to: {
            type: String,
            default: "",
            required: true,
        },
    },
});
</script>
