<script lang="ts" setup>
import type { PropType } from 'vue';


type ButtonType = "primary" | "secondary" | "danger" | "active" | "header" | "header-admin";

defineProps({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String as PropType<ButtonType>,
        required: true
    }
})

defineEmits(["click"])
</script>

<template>
    
    <button :class="`button button--${type}`" @click="$emit('click')">
        {{ title }}
    </button>

</template>

<style lang="scss" scoped>

.button {
    padding: 0.5rem 1rem;
    
    border-radius: 5px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    color: white;

    &--primary {
        background-color: #007bff;
        
    }

    &--secondary {
        background-color: #6c757d;
        
    }

    &--header {
        background-color: #8c97a1;
        transition: 0.2s ease all;
        &:hover {
            background-color: grey;
        }
    }

    &--active {
        background-color: #696f75;
    }

    &--danger {
        background-color: #dc3545;
        color: white;
    }
}

</style>