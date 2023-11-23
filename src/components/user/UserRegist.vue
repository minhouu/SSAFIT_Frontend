<template>
  <div class="container">
    <h2 class="fs-2 fw-bold mb-4">회원 가입</h2>
    <fieldset>
      <div class="mb-4">
        <label for="user-regist-id" class="form-label">아이디</label>
        <input type="text" class="form-control" id="user-regist-id" v-model="user.id" placeholder="아이디를 입력해주세요">
      </div>
      <div class="mb-4">
        <label for="user-regist-password" class="form-label">비밀번호</label>
        <input type="password" class="form-control" id="user-regist-password" v-model="user.password" placeholder="비밀번호를 입력해주세요">
      </div>
      <div class="mb-4">
        <label for="user-regist-passwordCheck" class="form-label">비밀번호 확인</label>
        <input type="password" class="form-control" id="user-regist-passwordCheck" v-model="user.passwordCheck" placeholder="비밀번호를 입력해주세요">
      </div>
      <div class="mb-4">
        <label for="user-regist-nickname" class="form-label">닉네임</label>
        <input type="text" class="form-control" id="user-regist-nickname" v-model="user.nickname" placeholder="닉네임을 입력해주세요">
      </div>
      <div class="mb-4">
        <label for="user-regist-usertype" class="form-label">유저 소속</label>
        <select class="form-select" id="user-regist-usertype" v-model="user.userType">
          <option value="1">트레이너</option>
          <option value="2">회원</option>
          <option value="3">관리자</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="user-regist-age" class="form-label">나이</label>
        <input type="number" class="form-control" id="user-regist-age" v-model="user.age">
      </div>
      <button type="button" class="btn btn-primary mx-1" @click="userStore.checkBeforeCreate(user)">등록하기</button>
      <RouterLink to="/">
        <button type="button" class="btn btn-primary mx-1">돌아가기</button>
      </RouterLink>
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
  age: 20,
});


</script>
