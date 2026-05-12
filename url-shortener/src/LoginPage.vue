<script lang="ts" setup>
import { ref } from 'vue';
import InputModel from './InputModel.vue';
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
        <div class="form">
            <div class="form__wrapper">
                <InputModel title="Username" v-model:input-model="username" type="login"/>
                <InputModel title="Password" v-model:input-model="password" type="login" />
                <ButtonModel type="primary" title="Login" @click="handleLogin" class="form__button"/>
            </div>
        </div>
    </div>
    
</template> 

<style lang="scss" scoped>
.center {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    width: 30%;
    padding: 1rem;
    max-height: 60%;
    aspect-ratio: 0.5/1;
    margin: auto;
    border: 1px solid black;
    

    &__wrapper {
        
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 80%;
        margin: auto;
    }

    &__button {
        width: 50%;
    }

    
}
</style>