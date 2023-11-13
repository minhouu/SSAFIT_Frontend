<template>
  <div class="container">
    <h2>회원 가입</h2>
    <fieldset class="text-center">
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="id" class="view" /><br />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="view"
      /><br />
      <label for="password2">비밀번호 확인</label>
      <input
        type="password"
        id="password2"
        v-model="password2"
        class="view"
      /><br />
      <label for="name">이름</label>
      <input type="text" id="name" v-model="name" class="view" /><br />
      <label for="email">이메일</label>
      <input type="email" id="email" v-model="email" class="view" /><br />
      <label for="age">나이</label>
      <input type="number" id="age" v-model="age" class="view" /><br />
      <button class="btn" @click="regist">등록</button>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["create-user"]);

const id = ref("");
const password = ref("");
const nickname = ref("");
const userType = ref("");


//제약조건 구현
//그렇게 detail하게 구현하지 않아도 괜찮을것 같음
//
const regist = () => {
  const article = {
    id: id.value,
    password: password.value,
    nickname: nickname.value,
    userType: userType.value,
  };

  axios({
    url: "user/join",
    method: "POST",
    data: article,

  })
  .then((res) => {        
      emit("create-article", article
      );
  })
}
  </script>
