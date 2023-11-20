<template>
  <div v-if="!isEditing">
    <fieldset>
      <legend>게시글 상세 정보</legend>
      <div>{{ boardStore.article.title }}</div>
      <div>{{ boardStore.article.nickname }}</div>
      <div>{{ boardStore.article.viewCnt }}</div>
      <div>{{ boardStore.article.createdAt }}</div>
      <div>{{ boardStore.article.content }}</div>
      <button v-if="boardStore.isEditor" @click="startEditing">수정하기</button>
      <button v-if="boardStore.isEditor" @click="boardStore.deleteArticle()">삭제하기</button>
    </fieldset>
    <Comment />
  </div>

  <div v-else>
    <h2>게시글 수정</h2>
    <fieldset>
      <div>이름 : {{ boardStore.article.nickname }}</div>
      <label for="title">제목</label>
      <input type="text" id="title" v-model="boardStore.article.title" class="view" /><br />
      <label for="content">내용</label>
      <input type="text" id="content" v-model="boardStore.article.content" class="view" /><br />
      <button class="btn" @click="boardStore.updateArticle()">수정</button>
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

onMounted(() => {
  const articleId = route.params.id;
  boardStore.getArticle(articleId);
});

const startEditing = () => {
  isEditing.value = true;
};
</script>


<style scoped></style>