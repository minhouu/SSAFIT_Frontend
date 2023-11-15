<template>
    <header>
        <nav class="header-nav">
            <div>
                <router-link to="/" class="logo">SSAFIT</router-link>
            </div>
            <div>
                <a href="#" v-if="userStore.user" @click="userStore.logout()">로그아웃</a>
                <router-link to="/login" v-else>로그인</router-link> |
                <!-- <router-link :to="{name : 'Regist'}">회원가입</router-link> -->
                <router-link to="/board">게시글 목록</router-link>
            </div>
        </nav>

    </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

</script>

<style scoped>

</style>