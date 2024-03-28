<template>
    <div class="accordion-header" @click="toggleOpen">
        <slot></slot>
    </div>
</template>

<script>
import { defineComponent } from "vue";

import "./theme.scss";

export default defineComponent({
    setup(_, { emit }) {
        const toggleOpen = () => {
            emit("toggle-open");
        };

        return { toggleOpen };
    },
});
</script>
