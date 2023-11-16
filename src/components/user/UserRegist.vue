<template>
  <div class="container">
    <h2>회원 가입</h2>
    <fieldset class="text-center">
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="user.id" class="view" /><br />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="user.password"
        class="view"
      /><br />
      <label for="password2">비밀번호 확인</label>
      <input
        type="password"
        id="password2"
        v-model="user.passwordCheck"
        class="view"
      /><br />
      <label for="name">닉네임</label>
      <input type="text" id="name" v-model="user.nickname" class="view" /><br />
      <label for="email">유저 타입</label>
      <input type="email" id="email" v-model="user.userType" class="view" /><br />
      <label for="age">나이</label>
      <input type="number" id="age" v-model="user.age" class="view" /><br />
      <button class="btn" @click="userStore.checkBeforeCreate(user)">등록</button>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

const user = ref({
  id: "",
  password: "",
  passwordCheck: "",
  nickname: "",
  userType: "",
  age: 0,
});


</script>
