<script lang="ts" setup>
import { ref, nextTick } from 'vue';

defineProps({
    text: {
        type: String,
        required: true
    }
});

const containerToggled = ref(false);

const contentRef = ref<HTMLElement | null>(null);

function toggleContainer() {
    const el = contentRef.value;

    if (!el) return;

    if (!containerToggled.value) {
        // OPEN
        containerToggled.value = true;

        nextTick(() => {
            el.style.height = el.scrollHeight + 'px';

            const onTransitionEnd = () => {
                el.style.height = 'auto';
                el.removeEventListener('transitionend', onTransitionEnd);
            };

            el.addEventListener('transitionend', onTransitionEnd);
        });

    } else {
        // CLOSE
        el.style.height = el.scrollHeight + 'px';

        requestAnimationFrame(() => {
            el.style.height = '0px';
        });

        containerToggled.value = false;
    }
}
</script>

<template>
    <div class="container">
        <div class="container__collapsible" @click="toggleContainer">
            <p class="container__text">
                {{ text }} <span><i class="pi pi-angle-up icon"
                        :class="{ 'container__text--active': containerToggled }"></i></span>
            </p>
        </div>

        <div ref="contentRef" class="container__content">
            <div class="container__content-inner">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.icon {
    transition: 0.24s ease all;
}

.container {
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 40%;
    overflow: hidden;
    background: #f3f3f3;

    &__collapsible {
        background-color: #dadada;
        padding: 1rem;
        cursor: pointer;

    }

    &__text {

        margin: 0;
        font-weight: bold;
        display: flex;
        justify-content: space-between;

        &--active {
            transform: rotate(180deg);
        }
    }

    &__content {
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease;

        &-inner {
            padding: 1rem;
        }
    }

}
</style>