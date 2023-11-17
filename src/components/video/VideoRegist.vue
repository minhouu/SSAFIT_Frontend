<template>
  <div class="container" v-if="userStore.user">
    <h2>게시글 등록</h2>
    <fieldset class="text-center">
      <div>이름 : {{ userStore.user.nickname }}</div>
      <label for="title">제목</label>
      <input type="text" id="title" v-model="video.title" class="view" /><br />
      <label for="content">내용</label>
      <input type="text" id="content" v-model="video.content" class="view" /><br />
      <label for="video-key">VIDEO KEY</label>
      <input type="text" id="video-key" v-model="video.videoKey" class="view" /><br />
      <label for="part">VIDEO KEY</label>
      <select id="part" v-model="video.part">
        <option value="abs">복근</option>
        <option value="arm">팔</option>
        <option value="back">등</option>
        <option value="cardio">유산소</option>
        <option value="chest">가슴</option>
        <option value="leg">다리</option>
        <option value="shoulder">어깨</option>
      </select><br />
      <button class="btn" @click="videoStore.createVideo(video)">등록</button>
    </fieldset>
  </div>
  <div v-else>로그인 후 이용해주세요</div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useVideoStore } from "@/stores/video";

const userStore = useUserStore();

const videoStore = useVideoStore();

const video = ref({
  writerSeq: userStore.user.userSeq,
  title: "",
  content: "",
  videoKey: "",
  part: "",
  nickname: userStore.user.nickname
});
</script>
