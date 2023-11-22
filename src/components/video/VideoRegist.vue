<template>
  <div class="container" v-if="userStore.user">
    <h2 class="mb-4">비디오 등록</h2>
    <fieldset>
      <div class="mb-4">
        <label for="video-regist-name" class="form-label">작성자</label>
        <input type="text" class="form-control" id="video-regist-name" :value="userStore.user.nickname" disabled>
      </div>
      <div class="row">
        <div class="col-9 mb-4">
          <label for="video-regist-title" class="form-label">제목</label>
          <input type="email" class="form-control" id="video-regist-title" placeholder="게시글 제목을 입력해주세요"
            v-model="video.title">
        </div>
        <div class="col-3 mb-4">
          <label class="form-label" for="video-regist-part">부위</label>
          <select class="form-select" id="video-regist-part" v-model="video.part">
            <option value="chest">가슴</option>
            <option value="back">등</option>
            <option value="leg">다리</option>
            <option value="shoulder">어깨</option>
            <option value="arm">팔</option>
            <option value="abs">복근</option>
            <option value="cardio">유산소</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label for="video-regist-url" class="form-label">유튜브 링크</label>
        <input class="form-control" id="video-regist-url" v-model="video.url" placeholder="유튜브 링크를 입력해주세요"/>
      </div>
      <div class="mb-4">
        <label for="video-regist-content" class="form-label">내용</label>
        <textarea class="form-control" id="video-regist-content" rows="5" placeholder="게시글 내용을 입력해주세요"
          v-model="video.content"></textarea>
      </div>
      <button type="button" class="btn btn-primary mx-1" @click="videoStore.createVideo(video)">등록하기</button>
      <RouterLink :to="{ name: 'VideoList' }">
        <button type="button" class="btn btn-primary mx-1">돌아가기</button>
      </RouterLink>
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
  url: "",
  part: "",
  nickname: userStore.user.nickname
});
</script>
