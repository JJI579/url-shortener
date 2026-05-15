<script lang="ts" setup>
import type { PropType } from 'vue';

type InputType = "text" | "code" | "login" | "checkbox";
defineProps({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String as PropType<InputType>,
        required: false,
        default: "text"
    },
    maxLength: {
        type: Number,
        required: false,
        default: 40
    }
})

const inputModel = defineModel<string | boolean>("inputModel", {
  required: true
})

</script>

<template>
    <div class="input">
        <div class="input__title">
            {{title}}
        </div>
        
        <input type="text" class="input__inp" v-model="inputModel" :maxlength="maxLength" :class="'input--' + type" v-if="type !== 'checkbox'">
        <input type="checkbox" class="input__inp" v-model="inputModel" :class="'input--' + type" v-else>
    </div>
</template> 

<style lang="scss" scoped>
.input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    width: 30%;
    &__title {
        font-weight: bold;
    }

    &__inp {
        height: 2.5rem;
        // width: 100%;
        
    }

    &--checkbox {
        $var: 25px;
        width: $var;
        height: $var;
    }

    &--login {

    }
    &--text {
        // make it look nice
        
    }

    &--code {
        
        font-weight: bold;
        font-size: large;
        text-align: center;
        letter-spacing: 10px;
        text-transform: uppercase;
    }
}
</style>