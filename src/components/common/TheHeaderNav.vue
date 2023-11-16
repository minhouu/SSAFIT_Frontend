<template>
    <header class="container">
        <nav class="header-nav">
            <div class="header">
                <div>
                    <router-link to="/" class="logo">
                        <img src="@\assets\logo_transparent.png" class="header-logo"/>
                    </router-link>
                </div> 
                <div>
                    <div v-if="userStore.user">
                        <router-link to="/board">
                            <button type="button" class="btn btn-primary btn-lg">게시글 목록</button>
                        </router-link> |
                        <a href="#" @click="userStore.logout()">
                            <button type="button" class="btn btn-primary btn-lg">로그아웃</button>
                        </a> |
                        <router-link :to="{name : 'UserDetail'}">
                            <button type="button" class="btn btn-primary btn-lg">내 정보</button>
                        </router-link>
                    </div>
                    <div v-else>
                        <router-link to="/login" >
                            <button type="button" class="btn btn-primary btn-lg">로그인</button>
                        </router-link> |
                        <router-link :to="{name : 'UserRegist'}">
                            <button type="button" class="btn btn-primary btn-lg">회원가입</button>
                        </router-link>
                    </div>
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


.header {
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px 10px 20px;
}

.header-logo {
    width: 100px;
    height: 100px;
}
</style>