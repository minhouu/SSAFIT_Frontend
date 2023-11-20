<template>
    <header class="container">
        <nav class="header-nav">
            <div class="header">
                <div>
                    <RouterLink to="/" class="logo">
                        <img src="@\assets\logo_transparent.png" class="header-logo"/>
                    </RouterLink>
                </div> 
                <div>
                    <div v-if="userStore.user">
                        <RouterLink :to="{name : 'UserDetail'}">
                            <button type="button" class="btn btn-primary btn-lg">내 정보</button>
                        </RouterLink> |
                        <a href="#" @click="userStore.logout()">
                            <button type="button" class="btn btn-primary btn-lg">로그아웃</button>
                        </a> 
                    </div>
                    <div v-else>
                        <RouterLink to="/login" >
                            <button type="button" class="btn btn-primary btn-lg">로그인</button>
                        </RouterLink> |
                        <RouterLink :to="{name : 'UserRegist'}">
                            <button type="button" class="btn btn-primary btn-lg">회원가입</button>
                        </RouterLink>
                    </div>
                </div>               
            </div>
        </nav>

    </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { RouterLink } from 'vue-router';

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