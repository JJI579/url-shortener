<script lang="ts" setup>
import { getImpliedNodeFormatForFile } from 'typescript';
import { ref } from 'vue';

const inputField = ref("");
const hasTriedSubmit = ref(false);
const response = ref("");
const API_URL = import.meta.env.VITE_API_URL;


async function handleSubmit() {
    // make sure not empty
    console.log("clicked")
    
    if (inputField.value.trim().length == 0) {
        
        hasTriedSubmit.value = true;
        return;
    }

    const resp = await fetch(`${API_URL}/link/shorten`, {
        method: "POST",
        body: JSON.stringify({ 
            url: inputField.value
        }),
        headers: { "Content-Type": "application/json" },
    });

    const content = await resp.json();
    response.value = content['url'];
}


const icon = ref({
    "pi-copy": true,
    "pi-check": false
})
function copyToClipboard() {
    navigator.clipboard.writeText(response.value);
    icon.value = {
        "pi-check": true,
        "pi-copy": false
    }
    setTimeout(() => {
        icon.value = {
        "pi-check": false,
        "pi-copy": true
    }
    }, 500);
}
</script>

<template>
    <div class="center">
        <div class="center__link link">
            <h1>Enter link to shorten</h1>
            <div class="link__field">
                <input type="text" placeholder="Link here..." class="link__input" :class="{'link__input--invalid': hasTriedSubmit && inputField != ''}" v-model="inputField">
                <button class="link__submit" @click="handleSubmit">Submit</button>
            </div>
            <div class="link__response" v-if="response.trim().length > 0">
                <a class="link__clickable" :href="response">{{ response }}</a>
                <div class="link__icon">
                    <i class="pi" :class="icon" @click="copyToClipboard"></i>
                </div>
            </div>
            
        </div>
    </div>


</template>

<style lang="scss" scoped>
.center {


    display: flex;
    justify-content: center;
    align-items: center;

    &__link {
        padding: 1rem;

    }
}

.link {
    width: 40%;

    &__field {
        display: flex;
        flex-direction: column;
        justify-self: center;
        gap: 10px;
    }

    &__input {
        height: 2.5rem;

    }

    &__submit {
        width: 80%;
        margin: auto;
        height: 2.5rem;
        border-radius: 10px;
        outline: none;
        border: none;
        padding: 6px 14px;
        border-radius: 6px;
        border: none;

        color: #fff;
        background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
        background-origin: border-box;
        box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);

        &:hover {
            box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
            outline: 0;
            cursor: pointer;
        }
    }

    // Response part
    &__response {
        padding-top: 1rem;
        text-align: center;
        width: fit-content;
        margin: auto;
        display: flex;
        gap: 1rem;
    }
    &__clickable {

    }

    
}


</style>