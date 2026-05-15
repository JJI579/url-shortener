<script lang="ts" setup>
import ButtonModel from '@/Components/Templates/ButtonModel.vue';



async function deleteAllLinks() {
    await fetch(`${import.meta.env.VITE_API_URL}/link/delete-all`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        },
    ); 
}

</script>

<template>
    <div class="settings">
        <h1>Settings</h1>
        <p>Here you can change the settings of the URL shortener. This includes things like the default expiration time for shortened URLs, the maximum length of custom link codes, and more.</p>
        
        <div class="settings__links">
            <h2>Links</h2>
            <div class="settings__actions">
                <ButtonModel title="View All Links" :type="'primary'" @click="deleteAllLinks"/>
                <ButtonModel title="Delete All Links" :type="'danger'" @click="deleteAllLinks"/>
            </div>
            
        </div>
        
    </div>

    
</template>

<style lang="scss" scoped>

.settings {
    width: 60%;
    margin: auto;
    
    &__links {
        display: flex;
        flex-direction: column;
    }

    &__actions {
        display: flex;
        gap: 10px;
    }

}
</style>