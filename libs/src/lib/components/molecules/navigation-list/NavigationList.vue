<template>
    <ul class="navigation-list">
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    name: "NavigationList",
});
</script>
