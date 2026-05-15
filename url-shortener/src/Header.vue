<script lang="ts" setup>
import { useRoute } from 'vue-router';
import ButtonModel from './Components/ButtonModel.vue';
import { onMounted, ref, watch } from 'vue';


const route = useRoute();

const routeName = ref("");

watch(route, (newRoute) => {
    routeName.value = newRoute.name as string;
});
</script>

<template>
    <div class="header">
        <RouterLink :to="{'name': 'home'}" class="header__title">
            <p class="header__title">QuickSwitcher</p>
        </RouterLink>
        <div class="header__end links">
            <RouterLink :to="{'name': 'home'}">
                <ButtonModel  title="Home" class="links__button" :type="routeName === 'home' ? 'active' : 'header'"/>
            </RouterLink>
            <RouterLink :to="{'name': 'shorten'}">
                <ButtonModel  title="Shorten" class="links__button" :type="routeName === 'shorten' ? 'active' : 'header'"/>
            </RouterLink>
            <RouterLink :to="{'name': 'admin'}">
                <ButtonModel  title="Admin" class="links__button" type="primary"/>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    width: 95%;
    margin: auto;
    padding-inline: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
        font-size: 1.5rem;
        font-weight: bold;
        color: black;
        text-decoration: none;
        
    }
    &__end {
        display: flex;
        gap: 10px;
    }
}

.items {
    &__button {
        padding: 6px 14px;
        border-radius: 6px;
        border: none;
        outline: none;
    }
}
</style>