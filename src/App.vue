<template>
  <div> 
    <button v-if="getUser" @click="printUser">유저 확인</button>
    <TheHeaderNav :user="store.user" @logout="logout" />
    <router-view @login-user="loginUser"></router-view>
  </div>
</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from "@/util/axios";
import { useStore } from '@/stores/ssafit';

const router = useRouter();
const store = useStore();

const getUser = computed(() => !!store.user);

onMounted(() => {
  axios({
    method: "get",
    url: "user/status"
  })
  .then((res)=> {
    console.log(res)
  }) 
  .catch((err) => {
    console.log(err)
    console.log("아직 로그인 안됨")
  })  
})

const printUser = () => {
  console.log(store.user);
}

const logout = () => {
  store.user = null;
  axios({
    method: "get",
    url: "user/logout",
  })
  .then(() => {
    alert("로그아웃 성공");
    router.push("/");
  })
  localStorage.removeItem("loginUser");
};

const loginUser = (loginUser) => {
  console.log(loginUser)
  axios({
    url: 'user/login',
    method: 'POST',
    data: loginUser
  })
  .then((res) => {
    store.user = loginUser;
    store.user.nickname = res.data.nickname;
    store.user.userSeq = res.data.userSeq - 0;
    console.log(res.data)
    console.log(store.user)
    alert("로그인 성공");    
    router.push("/");
  })
  .catch((err) => {
    console.log(err)
    alert("로그인 실패");
    router.push("login");
  })
}

const getUserInfo = (userId) => {
  axios()
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: Arial, Helvetica, sans-serif;
}
.text-center {
  text-align: center;
}
.container {
  margin: 0px 30px;
}
</style>