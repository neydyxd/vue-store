<template>
    <div :class="['accordion-item', { open: isOpen }, { close: !isOpen }]">
        <FaqAccordionHeader @toggle-open="toggleOpen">
            <slot name="header"></slot>
        </FaqAccordionHeader>
        <FaqAccordionPanel v-if="isOpen">
            <slot name="content"></slot>
        </FaqAccordionPanel>
    </div>
</template>

<script>
import FaqAccordionHeader from "@/components/atoms/faq-accordion-header/FaqAccordionHeader.vue";
import FaqAccordionPanel from "@/components/atoms/faq-accordion-panel/FaqAccordionPanel.vue";
import { defineComponent, ref } from "vue";

import "./theme.scss";

export default defineComponent({
    components: {
        FaqAccordionHeader,
        FaqAccordionPanel,
    },
    setup() {
        const isOpen = ref(false);

        const toggleOpen = () => {
            isOpen.value = !isOpen.value;
        };

        return {
            isOpen,
            toggleOpen,
        };
    },
});
</script>
