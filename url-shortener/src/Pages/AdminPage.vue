<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from './stores/counter';
import { useRouter } from 'vue-router';


const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
    if (!userStore.getLoggedIn()) {
        router.push('/login');
    }
});

</script>

<template>

    <div class="admin">
        <p class="admin__title">Admin Page</p>
    </div>
    
</template>

<style lang="scss" scoped>

</style>