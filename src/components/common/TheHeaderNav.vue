<template>
    <header class="container">
        <nav class="header mb-4" style="height: 330px;">
            <div class="d-flex justify-content-between align-items-center">
                <RouterLink class="navbar-brand m-3" to="/">
                    <h1 class="text-primary tw-bold" style="backdrop-filter: blur(5px)">PINKDUMBBELL</h1>
                </RouterLink>
                <div class="m-3">
                    <div v-if="userStore.user">
                        <RouterLink :to="{ name: 'UserDetail' }">
                            <button type="button" class="btn btn-primary">내 정보</button>
                        </RouterLink> |
                        <a href="#" @click="userStore.logout()">
                            <button type="button" class="btn btn-primary">로그아웃</button>
                        </a>
                    </div>
                    <div v-else>
                        <RouterLink to="/login">
                            <button type="button" class="btn btn-primary">로그인</button>
                        </RouterLink> |
                        <RouterLink :to="{ name: 'UserRegist' }">
                            <button type="button" class="btn btn-primary">회원가입</button>
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
.header {
    background-image: linear-gradient(rgb(227, 115, 131, 0.1), rgb(227, 11, 92, 0.1)), url('../../assets/header.jpg');
    background-size: cover;
    background-position: center;
    opacity : 0.8;
}

</style>