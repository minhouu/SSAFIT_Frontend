<template>
  <div class="container" v-if="userStore.user">
    <h2 class="mb-4">게시글 등록</h2>
    <fieldset>
      <div class="mb-4">
        <label for="board-regist-name" class="form-label">작성자</label>
        <input type="text" class="form-control" id="board-regist-name" :value="userStore.user.nickname"  disabled>
      </div>
      <div class="mb-4">
        <label for="board-regist-title" class="form-label">제목</label>
        <input type="email" class="form-control" id="board-regist-title" placeholder="게시글 제목을 입력해주세요" v-model="article.title">
      </div>
      <div class="mb-4">
        <label for="board-regist-content" class="form-label">내용</label>
        <textarea class="form-control" id="board-regist-content" rows="5" placeholder="게시글 내용을 입력해주세요" v-model="article.content"></textarea>
      </div>
      <button type="button" class="btn btn-primary mx-1" @click="boardStore.createArticle(article)">등록하기</button>
      <RouterLink :to="{ name: 'BoardList' }">
        <button type="button" class="btn btn-primary mx-1">돌아가기</button>
      </RouterLink>
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
  