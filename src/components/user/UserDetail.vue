<template>
  <div>
    <h2>유저 상세정보</h2>
    <fieldset class="text-center">
      <label for="id">아이디</label>
      <div type="text" id="id" class="view">{{ userStore.user.id }}</div><br />
      <label for="name">닉네임</label>
      <div id="name" class="view">{{ userStore.user.nickname }}</div>
      <br/>
      <button class="btn" @click="userStore.checkBeforeCreate(user)">수정</button>
    </fieldset>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();


</script>

<style lang="scss" scoped>

</style>