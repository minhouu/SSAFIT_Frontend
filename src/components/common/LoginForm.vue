<template>
  <div class="container">

    <h2 style="margin-bottom: 40px;">로그인</h2>
    <fieldset>
      <div class="mb-3">
        <label class="form-label" for="id">아이디</label>
        <input type="email" class="form-control" v-model="user.id" id="id">
      </div>

      <div class="mb-3">
        <label class="form-label" for="password">비밀번호</label>
        <input type="password" class="form-control" v-model="user.password" id="password">
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

<style scoped></style>