<script lang="ts" setup>
import { ref } from 'vue';
import InputModel from './Components/InputModel.vue';
import ButtonModel from './Components/ButtonModel.vue';
import { useUserStore } from './stores/counter';
import router from './router';

const userStore = useUserStore();

const username = ref("");
const password = ref("");

async function handleLogin() {
    userStore.login(username.value, password.value);
    if (userStore.getLoggedIn()) {
        router.push("/");
    } else {
        alert("Login failed. Please check your credentials and try again.");
    }
}
</script>

<template>
    <div class="center">
        <div class="form container">
            <div class="form__wrapper">
                <h1 class="form__title">QuickSwitcher</h1>
                <p class="form__text">Enter your Credentials to use the Admin Panel.</p>
                <div class="inputs">
                    <InputModel title="Username" v-model:input-model="username" type="login" class="form__button"/>
                    <InputModel title="Password" v-model:input-model="password" type="login" class="form__button"/>
                    <ButtonModel type="primary" title="Login" @click="handleLogin" class="form__button"/>
                </div>
                
            </div>
        </div>
    </div>
    
</template> 

<style lang="scss" scoped>

@use "@/variables.scss" as *;

.center {
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {

    width: 30%;
    padding: 1rem;
    max-height: 80%;
    aspect-ratio: 0.5/1;
    margin: auto;
    
    border-radius: 10px;
    

    &__wrapper {
        
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 80%;
        margin: auto;
    }

    &__title {
        margin: 0;
        margin-top: 1rem;
    }

    &__text {
        text-align: center;
        margin: 0;
    }
    .inputs {
        width: 100%;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    &__button:last-child {
        margin-top: 1rem;
        height: 2.5rem;
        width: 80%;
    }
    &__button {
        width: 100%;
        
        & .input__inp {
            width: 100%;
        }
    }

    
}
</style>