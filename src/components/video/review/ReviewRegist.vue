<template>
  <div>
    <div class="container" v-if="userStore.user">
      <h2>리뷰 등록</h2>
      <fieldset class="text-center">
        <div>이름 : {{ userStore.user.nickname }}</div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="review.title" class="view" /><br />
        <label for="content">내용</label>
        <input type="text" id="content" v-model="review.content" class="view" /><br />
        <button class="btn" @click="reviewStore.createReview(review)">등록</button>
      </fieldset>
    </div>
    <div v-else>로그인 후 이용해주세요</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useReviewStore } from "@/stores/review";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const reviewStore = useReviewStore();
const route = useRoute();

const review = ref({
  writerSeq: userStore.user.userSeq,
  title: "",
  content: "",
  videoId: route.params.videoId,
});

</script>

<style scoped></style>