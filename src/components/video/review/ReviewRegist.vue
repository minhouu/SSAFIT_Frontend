<template>
  <div class="container" v-if="userStore.user">
    <h2 class="fs-2 fw-bold mb-5">리뷰 등록</h2>
    <fieldset>
      <div class="mb-4">
        <label for="review-regist-name" class="form-label">작성자</label>
        <input type="text" class="form-control" id="review-regist-name" :value="userStore.user.nickname" disabled>
      </div>
      <div class="mb-4">
        <label for="review-regist-title" class="form-label">제목</label>
        <input type="email" class="form-control" id="review-regist-title" placeholder="게시글 제목을 입력해주세요"
          v-model="review.title">
      </div>
      <div class="mb-4">
        <label for="review-regist-content" class="form-label">내용</label>
        <textarea class="form-control" id="review-regist-content" rows="5" placeholder="게시글 내용을 입력해주세요"
          v-model="review.content"></textarea>
      </div>
      <button type="button" class="btn btn-primary mx-1" @click="reviewStore.createReview(review)">등록하기</button>
      <button type="button" class="btn btn-primary mx-1" @click="router.go(-1)">돌아가기</button>
    </fieldset>
  </div>
  <div v-else>로그인 후 이용해주세요</div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useReviewStore } from "@/stores/review";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const reviewStore = useReviewStore();

const review = ref({
  writerSeq: userStore.user.userSeq,
  title: "",
  content: "",
  videoId: route.params.videoId,
});

</script>

<style scoped></style>