<template>
  <div class="container" v-if="userStore.user">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="fw-bold my-4">리뷰 목록</h2>
      <RouterLink :to="`/review/regist/${videoId}`">
        <button type="button" class="btn btn-primary">리뷰 쓰기</button>
      </RouterLink>
    </div>

    <hr>
    <div v-if="reviewStore.reviewList.length">
      <table class="table table-hover">
        <thead>
          <tr>
            <th style="width: 20%;">작성자</th>
            <th style="width: 60%;">제목</th>
            <th style="width: 10%;">조회수</th>
            <th style="width: 10%;">작성일시</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(review, index) in reviewStore.reviewList" :key="index">
            <td>{{ review.nickname }}</td>
            <td>
              <RouterLink class="nav-link active" :to="`/review/${review.reviewId}`">
                {{ review.title }}
              </RouterLink>
            </td>
            <td>{{ review.viewCnt }}</td>
            <td>{{ dateParser.formatDate(review.createdAt) }}</td>
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
import { useDateParserStore } from "@/stores/dateParser";
import { useRoute, useRouter } from "vue-router";

const reviewStore = useReviewStore();
const userStore = useUserStore();
const dateParser = useDateParserStore();  

const route = useRoute();

const videoId = route.params.id;

onMounted(() => {
  reviewStore.getReviewList(videoId);
});

</script>

<style scoped>

</style>