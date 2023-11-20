<template>
<div class="container">
    <h2>로그인</h2>
    <fieldset>
      <label for="id">아이디</label>
      <div class="input-group input-group-lg">
        <input type="text" v-model="user.id" class="form-control" id="id">
      </div>
      <label for="password">비밀번호</label>
      <div class="input-group input-group-lg">
        <input type="password" v-model="user.password" class="form-control" id="password">
      </div>
      <button type="button" class="btn btn-primary btn-lg" @click="userStore.login(user)">로그인</button>
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