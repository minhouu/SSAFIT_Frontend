<template>
  <div class="container">
    <div v-if="!isEditing">
      <div class="d-flex justify-content-between align-items-center mx-3 mb-4">
        <h3 class="fs-3 fw-bold">리뷰 상세보기</h3>
        <button class="btn btn-primary" @click="router.go(-1)">게시물로 돌아가기</button>
      </div>
      
      <fieldset class="form-control mb-3">
        <div class="mb-3">
          <div class="row d-flex align-items-baseline border-bottom border-1 border-dark p-2 my-2">
            <div class="col fw-bold fs-2">{{ reviewStore.review.title }}</div>
            <div class="col-2 d-flex justify-content-center">
              <div>{{ reviewStore.review.createdAt }}</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col text-muted">
              <div>작성자 : {{ reviewStore.review.nickname }}</div>
              <div>조회수 : {{ reviewStore.review.viewCnt }}회</div>
            </div>
            <div class="col-2 d-flex justify-content-center">
              <button class="btn btn-primary btn-sm m-2" v-if="reviewStore.isEditor" @click="changeEditing">수정하기</button>
              <button class="btn btn-primary btn-sm m-2" v-if="reviewStore.isEditor"
                @click="reviewStore.deleteReview()">삭제하기</button>
            </div>
          </div>
        </div>
        <pre class="mx-2 mb-4 mt-3 fs-6">{{ reviewStore.review.content }}</pre>
      </fieldset>
    </div>

    <div v-else>
      <h3 class="mb-4">리뷰 수정</h3>
      <fieldset>
        <div class="mb-4">
          <label for="review-update-name" class="form-label">작성자</label>
          <input type="text" class="form-control" id="review-update-name" :value="reviewStore.review.nickname" disabled>
        </div>
        <div class="mb-4">
          <label for="review-update-title" class="form-label">제목</label>
          <input type="email" class="form-control" id="review-update-title" v-model="reviewStore.review.title">
        </div>
        <div class="mb-4">
          <label for="review-update-content" class="form-label">내용</label>
          <textarea class="form-control" id="review-update-content" rows="5"
            v-model="reviewStore.review.content"></textarea>
        </div>
        <button type="button" class="btn btn-primary mx-1" @click="reviewStore.updateReview()">수정하기</button>
        <button type="button" class="btn btn-primary mx-1" @click="changeEditing">돌아가기</button>
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

const changeEditing = () => {
  isEditing.value = !isEditing.value;
  reviewStore.getReview(reviewId);
};

</script>

<style scoped></style>