<template>
  <div v-if="videoStore.video">
    <div class="container" v-if="!isEditing">
      <fieldset class="form-control mb-3">
        <div class="mb-3">
          <div class="row d-flex align-items-baseline border-bottom border-1 border-dark p-2 my-2">
            <div class="col fw-bold fs-2">{{ videoStore.video.title }}</div>
            <div class="col-2 d-flex justify-content-center">
              <div>{{ videoStore.video.createdAt }}</div>
            </div>
          </div>
          <div class="row p-2">
            <div class="col text-muted">
              <div>작성자 : {{ videoStore.video.nickname }}</div>
              <div>조회수 : {{ videoStore.video.viewCnt }}회</div>
            </div>
            <div class="col-2 d-flex justify-content-center">
              <button class="btn btn-primary m-2" v-if="videoStore.isEditor" @click="changeEditing">수정</button>
              <button class="btn btn-primary m-2" v-if="videoStore.isEditor"
                @click="videoStore.deleteVideo()">삭제</button>
            </div>
          </div>
        </div>
        <iframe class="my-3" width="560" height="315" :src="videoURL" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
        <pre class="mx-2 mb-3 mt-3 fs-6">{{ videoStore.video.content }}</pre>
      </fieldset>
      <ReviewList />

    </div>

    <div v-else>
      <h2>비디오 수정</h2>
      <fieldset>
        <div class="mb-4">
          <label for="video-update-name" class="form-label">작성자</label>
          <input type="text" class="form-control" id="video-update-name" :value="userStore.user.nickname" disabled>
        </div>
        <div class="row">
          <div class="col-9 mb-4">
            <label for="video-update-title" class="form-label">제목</label>
            <input type="email" class="form-control" id="video-update-title" placeholder="게시글 제목을 입력해주세요"
              v-model="videoStore.video.title">
          </div>
          <div class="col-3 mb-4">
            <label class="form-label" for="video-update-part">부위</label>
            <select class="form-select" id="video-update-part" v-model="videoStore.video.part">
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
          <label for="video-update-url" class="form-label">유튜브 링크</label>
          <input class="form-control" id="video-update-url" v-model="videoStore.video.url" placeholder="유튜브 링크를 입력해주세요" />
        </div>
        <div class="mb-4">
          <label for="video-update-content" class="form-label">내용</label>
          <textarea class="form-control" id="video-update-content" rows="5" placeholder="게시글 내용을 입력해주세요"
            v-model="videoStore.video.content"></textarea>
        </div>
        <button type="button" class="btn btn-primary mx-1" @click="videoStore.updateVideo()">등록하기</button>
        <button type="button" class="btn btn-primary mx-1" @click="changeEditing">돌아가기</button>
      </fieldset>
    </div>
  </div>
  <div v-else>
    <div class="my-4">
      존재하지 않는 게시물입니다.
    </div>
    <button class="btn btn-primary" @click="router.go(-1)">뒤로 가기</button>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVideoStore } from '@/stores/video';
import { useUserStore } from '@/stores/user';
import ReviewList from './review/ReviewList.vue';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const videoStore = useVideoStore();

const isEditing = ref(false);

const videoId = route.params.id;

onMounted(() => {
  videoStore.getVideo(videoId);
});

const changeEditing = () => {
  isEditing.value = !isEditing.value;
  videoStore.getVideo(videoId);
};

const videoURL = computed(() => {
  const videoKey = videoStore.video.videoKey;
  return `https://www.youtube.com/embed/${videoKey}`
})
</script>


<style scoped></style>