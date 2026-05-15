<script lang="ts" setup>
import { getImpliedNodeFormatForFile } from 'typescript';
import { onMounted, ref } from 'vue';
import CollapsibleContainer from './Components/CollapsibleContainer.vue';
import InputModel from './Components/InputModel.vue';
import useAlertStore from './AlertStore';
import RadioModel from './Components/RadioModel.vue';

const inputField = ref("");
const hasTriedSubmit = ref(false);
const response = ref("");
const API_URL = import.meta.env.VITE_API_URL;

onMounted(() => {

})

async function handleSubmit() {
    // make sure not empty
    console.log("clicked")

    if (inputField.value.trim().length == 0) {

        hasTriedSubmit.value = true;
        return;
    }
    const dataBody: { url: string; custom?: string } = {
        url: inputField.value,
    };

    if (customLinkCode.value.trim().length > 0) {
        dataBody['custom'] = customLinkCode.value.trim().toUpperCase()
    }

    console.log(dataBody)
    const resp = await fetch(`${API_URL}/link/shorten`, {
        method: "POST",
        body: JSON.stringify(dataBody),
        headers: { "Content-Type": "application/json" },
    });

    if (resp.ok) {
        const content = await resp.json();
        useAlertStore().alert({
            text: "URL shortened successfully!",
            type: "success"
        });
        response.value = content['url'];
    } else {
        useAlertStore().alert({
            text: "Error occurred while shortening URL ",
            type: "error"
        });
        return;
    }
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
    useAlertStore().alert({
        text: "Copied to clipboard!",
        type: "success"
    });
    setTimeout(() => {
        icon.value = {
            "pi-check": false,
            "pi-copy": true
        }
    }, 500);
}

function pasteClipboard() {
    navigator.clipboard.readText().then(text => {
        inputField.value = text;
    });
}

// Advanced Settings
const customLinkCode = ref("");
const isPrivate = ref(false);

</script>

<template>
    <div class="center">
        <div class="center__link link">
            <h1>Enter Link to Shorten</h1>
            <div class="link__field">
                <div class="link__inputs">
                    <input type="text" placeholder="Link here..." class="link__input"
                        :class="{ 'link__input--invalid': hasTriedSubmit && inputField != '' }" v-model="inputField">
                    <button class="link__paste" @click="pasteClipboard"><i class="pi pi-clipboard"></i></button>
                </div>
                <button class="link__submit" @click="handleSubmit">Submit</button>
            </div>
            <br>
            <div class="link__response" v-if="response.trim().length > 0">
                <a class="link__clickable" :href="response">{{ response }}</a>
                <div class="link__icon">
                    <i class="pi" :class="icon" @click="copyToClipboard"></i>
                </div>
            </div>

        </div>

        <CollapsibleContainer :text="'Advanced Settings'">
            <div class="inputs">

                <InputModel :title="'Custom Link'" v-model:input-model="customLinkCode" :max-length="6" type="code" />

                <RadioModel title="Private" v-model:input-model="isPrivate" />

            </div>
        </CollapsibleContainer>

    </div>


</template>

<style lang="scss" scoped>

@use "@/variables.scss" as *;
.center {


    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    gap: 1rem;

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

    &__inputs {
        width: 100%;
        display: flex;
        gap: 5px;
    }

    &__paste {
        aspect-ratio: 1/1;
        font-size: large;
    }

    &__input {
        height: 2.5rem;
        flex: 1;

    }

    &__submit {
        width: 70%;
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

    &__clickable {}
}

.inputs {
    display: flex;
    gap: 1rem;
    flex-basis: 50%;
}
</style>