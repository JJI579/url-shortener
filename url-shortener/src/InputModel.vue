<script lang="ts" setup>

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
    <div class="input">
        <div class="input__title">
            {{title}}
        </div>
        <input type="text" class="input__inp" v-model="inputModel" :maxlength="maxLength">
    </div>
</template> 

<style lang="scss" scoped>
.input {
    &__title {
        font-weight: bold;
    }

    &__inp {
        text-transform: uppercase;
        height: 2.5rem;
        font-size: large;
        text-align: center;
        letter-spacing: 10px;
        width: 30%;
        font-weight: bold;
    }
}
</style>