<template>
    <div class="container" v-if="userStore.user">
      <h2>게시글 등록</h2>
      <fieldset class="text-center">
        <div>이름 : {{ userStore.user.nickname }}</div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="article.title" class="view" /><br />
        <label for="content">내용</label>
        <input type="text" id="content" v-model="article.content" class="view" /><br />
        <button class="btn" @click="boardStore.createArticle(article)">등록</button>
      </fieldset>
    </div>
    <div v-else>로그인 후 이용해주세요</div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useUserStore } from "@/stores/user";
  import { useBoardStore } from "@/stores/board";

  const userStore = useUserStore();

  const boardStore = useBoardStore();

  const article = ref({
    writerSeq: userStore.user.userSeq,
    title: "",
    content: "",
    nickname: userStore.user.nickname
  });
  </script>
  