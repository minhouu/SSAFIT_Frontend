<template>
    <header>
        <nav class="header-nav">
            <div>
                <router-link to="/" class="logo">SSAFIT</router-link>
            </div>
            <div>
                <a href="#" v-if="getUser" @click="logout">로그아웃</a>
                <router-link to="/login" v-else>로그인</router-link> |
                <!-- <router-link :to="{name : 'Regist'}">회원가입</router-link> -->
                <router-link to="/board">게시글 목록</router-link>
            </div>
        </nav>

    </header>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["user"]);
const emits = defineEmits(["logout"]);

console.log(props.user);
console.log(!!props.user);

const getUser = computed(() => !!props.user);

const logout = () => {
    emits("logout");
};
</script>

<style scoped>

</style>