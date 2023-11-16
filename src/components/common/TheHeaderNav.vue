<template>
    <header>
        <nav class="header-nav">
            <div>
                <router-link to="/" class="logo">SSAFIT</router-link>
            </div>
            <div>
                <div v-if="userStore.user">
                    <router-link to="/board">게시글 목록</router-link> |
                    <a href="#" @click="userStore.logout()">로그아웃</a> |
                    <router-link :to="{name : 'UserDetail'}">내 정보</router-link>
                </div>
                <div v-else>
                    <router-link to="/login">로그인</router-link> |
                    <router-link :to="{name : 'UserRegist'}">회원가입</router-link>
                </div>
                
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