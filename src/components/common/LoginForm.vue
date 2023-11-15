<template>
<div class="container">
    <h2>로그인</h2>
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
      <button class="btn" @click="userStore.login(user)">로그인</button>
    </fieldset>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const user = ref({
    id: "",
    password: "",
  });

</script>

<style scoped>

</style>