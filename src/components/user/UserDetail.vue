<template>
  <div class="container">
    <h2 class="fs-2 fw-bold mb-4">유저 상세정보</h2>
    <fieldset>
      <div class="mb-4">
        <label for="user-id" class="form-label">아이디</label>
        <input type="text" class="form-control" id="user-id" :value="userStore.user.id"  disabled>
      </div>
      <div class="mb-4">
        <label for="user-name" class="form-label">닉네임</label>
        <input type="text" class="form-control" id="user-name" :value="userStore.user.nickname"  disabled>
      </div>
      <button class="btn btn-primary mx-1" @click="userStore.checkBeforeCreate(user)">수정</button>
    </fieldset>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();


</script>

<style lang="scss" scoped>

</style>