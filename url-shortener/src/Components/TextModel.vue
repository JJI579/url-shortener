<script lang="ts" setup>
import type { PropType } from 'vue';
import InputModel from './InputModel.vue';



type InputType = "text";
defineProps({
    title: {
        type: String,
        required: true
    },
    maxLength: {
        type: Number,
        required: false,
        default: 40
    }
})

const inputModel = defineModel<string>("inputModel", {
  required: true
})

</script>

<template>
    <InputModel :title="title" type="text" v-model:input-model="inputModel" :max-length="maxLength"/>
</template> 

<style lang="scss" scoped>
.input {


    &__title {
        font-weight: bold;
    }

    &__inp {
        height: 2.5rem;
        
    }

    &--login {
        
        
    }
    &--text {
        // make it look nice
    }

    &--code {
        width: 30%;
        font-weight: bold;
        font-size: large;
        text-align: center;
        letter-spacing: 10px;
        text-transform: uppercase;
    }
}
</style>