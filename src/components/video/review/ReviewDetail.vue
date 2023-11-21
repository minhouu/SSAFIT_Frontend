<template>
  <div class="container">
    <div v-if="!isEditing">
      <fieldset>
        <legend>게시글 상세 정보</legend>
        <button @click="router.go(-1)">뒤로 가기</button>
        <div>{{ reviewStore.review.title }}</div>
        <div>{{ reviewStore.review.viewCnt }}</div>
        <div>{{ reviewStore.review.nickname }}</div>
        <div>{{ reviewStore.review.createdAt }}</div>
        <div>{{ reviewStore.review.content }}</div>
        <button v-if="reviewStore.isEditor" @click="startEditing">수정하기</button>
        <button v-if="reviewStore.isEditor" @click="reviewStore.deleteReview()">삭제하기</button>
      </fieldset>
    </div>

    <div v-else>
      <h2>게시글 수정</h2>
      <fieldset>
        <div>이름 : {{ reviewStore.review.nickname }}</div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="reviewStore.review.title" class="view" /><br />
        <label for="content">내용</label>
        <input type="text" id="content" v-model="reviewStore.review.content" class="view" /><br />
        <button class="btn" @click="reviewStore.updateReview()">수정</button>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useReviewStore } from '@/stores/review';

const route = useRoute();
const router = useRouter();

const reviewStore = useReviewStore();

const isEditing = ref(false);

onMounted(() => {
  const reviewId = route.params.id;
  reviewStore.getReview(reviewId);
});

const startEditing = () => {
  isEditing.value = true;
};

</script>

<style scoped></style>