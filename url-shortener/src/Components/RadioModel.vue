<script lang="ts" setup>
import type { PropType } from 'vue';
import InputModel from './InputModel.vue';



defineProps({
    title: {
        type: String,
        required: true
    },
})

const inputModel = defineModel<boolean>("inputModel", {
  required: true
})

</script>

<template>
    <InputModel :title="title" type="checkbox" v-model:input-model="inputModel"/>
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