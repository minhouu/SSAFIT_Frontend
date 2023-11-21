<template>
  <div class="container" v-if="!isEditing">
    <fieldset class="form-control mb-3">
      <div class="mb-3">
        <div class="row d-flex align-items-baseline border-bottom border-1 border-dark p-2">
          <div class="col fw-bold fs-2">{{ boardStore.article.title }}</div>
          <div class="col-2 d-flex justify-content-center">
            <div>{{ boardStore.article.createdAt }}</div>
          </div>
        </div>
        <div class="row p-2">
          <div class="col text-muted">
            <div>작성자 : {{ boardStore.article.nickname }}</div>
            <div>조회수 : {{ boardStore.article.viewCnt }}회</div>
          </div>
          <div class="col-2 d-flex justify-content-center">
            <button class="btn btn-primary btn-sm m-2" v-if="boardStore.isEditor" @click="changeEditing">수정하기</button>
            <button class="btn btn-primary btn-sm m-2" v-if="boardStore.isEditor" @click="boardStore.deleteArticle()">삭제하기</button>
          </div>
        </div>
      </div>

      <pre class="mx-2 mb-3 mt-3 fs-6">{{ boardStore.article.content }}</pre>
    </fieldset>
    <Comment />
  </div>

  <div v-else>
    <h2 class="mb-4">게시글 수정</h2>
    <fieldset>
      <div class="mb-4">
        <label for="board-update-name" class="form-label">작성자</label>
        <input type="text" class="form-control" id="board-update-name" :value="boardStore.article.nickname"  disabled>
      </div>
      <div class="mb-4">
        <label for="board-update-title" class="form-label">제목</label>
        <input type="email" class="form-control" id="board-update-title" v-model="boardStore.article.title">
      </div>
      <div class="mb-4">
        <label for="board-update-content" class="form-label">내용</label>
        <textarea class="form-control" id="board-update-content" rows="5" v-model="boardStore.article.content"></textarea>
      </div>
      <button type="button" class="btn btn-primary mx-1" @click="boardStore.updateArticle()">수정하기</button>
      <button type="button" class="btn btn-primary mx-1" @click="changeEditing">돌아가기</button>
    </fieldset>
  </div>
</template>

<script setup>
import Comment from './comment/CommentList.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/stores/board';

const route = useRoute();

const boardStore = useBoardStore();

const isEditing = ref(false);

const articleId = route.params.id;

onMounted(() => {
  boardStore.getArticle(articleId);
});

const changeEditing = () => {
  isEditing.value = !isEditing.value;
  boardStore.getArticle(articleId);
};
</script>

<style scoped>
pre {
  font-family: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";;
}
</style>