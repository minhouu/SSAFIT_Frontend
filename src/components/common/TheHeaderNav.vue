<template>
    <header class="container">
        <nav class="navbar navbar-expand-lg bg-body-tertiary" id="the-header">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" to="/">
                    <!-- <img src="@\assets\logo_transparent.png" class="header-logo"/> -->
                    <h1>SSAFIT</h1>
                </RouterLink>
                <div>
                    <div v-if="userStore.user">
                        <RouterLink :to="{ name: 'UserDetail' }">
                            <button type="button" class="btn btn-secondary">내 정보</button>
                        </RouterLink> |
                        <a href="#" @click="userStore.logout()">
                            <button type="button" class="btn btn-secondary">로그아웃</button>
                        </a>
                    </div>
                    <div v-else>
                        <RouterLink to="/login">
                            <button type="button" class="btn btn-secondary">로그인</button>
                        </RouterLink> |
                        <RouterLink :to="{ name: 'UserRegist' }">
                            <button type="button" class="btn btn-secondary">회원가입</button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </nav>
        <TheMenuNav />
    </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { RouterLink } from 'vue-router';
import TheMenuNav from './TheMenuNav.vue';

const userStore = useUserStore();

</script>

<style scoped>
#the-header {
    margin-bottom: 40px;
}
</style>