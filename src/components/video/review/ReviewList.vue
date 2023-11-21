<template>
  <div class="container" v-if="userStore.user">
    <div class="review-list-top">
      <h2>리뷰 목록</h2>
        <RouterLink :to="`/review/regist/${videoId}`" >
          <button type="button" class="btn btn-primary">새 리뷰 쓰기</button>
        </RouterLink>
    </div>
    
    <hr>
    <div v-if="reviewStore.reviewList.length">
      <table class="table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일시</th>
            <th>수정여부</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(review, index) in reviewStore.reviewList" :key="index" >
              <td>
                <RouterLink class="review-datail" :to="`/review/${review.reviewId}`">
                  {{ review.title }}
                </RouterLink>
              </td>
              <td>{{ review.nickname }}</td>
              <td>{{ review.viewCnt }}</td>
              <td>{{ review.createdAt }}</td>
              <td v-if="review.isEdited === 1">수정됨</td>
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else>등록된 리뷰가 없습니다.</div>
  </div>
  <div v-else>로그인 후 이용해주세요</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useReviewStore } from "@/stores/review";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";

const reviewStore = useReviewStore();
const userStore = useUserStore();

const route = useRoute();

const videoId = route.params.id;

onMounted(() => {
  reviewStore.getReviewList(videoId);
});

</script>

<style scoped>

</style>