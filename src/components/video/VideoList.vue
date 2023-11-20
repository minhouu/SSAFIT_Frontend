<template>
  <div class="container" v-if="userStore.user">
    <div class="video-list-top">
      <h2>비디오 목록</h2>
      <RouterLink to="/video/regist">
        <button type="button" class="btn btn-primary">새 비디오 추가하기</button>
      </RouterLink>
    </div>

    <hr>
    <div v-if="videoStore.videoList.length">
      <table class="table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>부위</th>
            <th>조회수</th>
            <th>작성일시</th>
            <th>수정여부</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(video, index) in videoStore.videoList" :key="index">
            <td>
              <RouterLink :to="`/video/${video.videoId}`">
                {{ video.title }}
              </RouterLink>
            </td>
            <td>{{ video.nickname }}</td>
            <td>{{ video.part }}</td>
            <td>{{ video.viewCnt }}</td>
            <td>{{ video.createdAt }}</td>
            <td v-if="video.isEdited === 1">수정됨</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>등록된 비디오가 없습니다.</div>
  </div>
  <div v-else>로그인 후 이용해주세요</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useVideoStore } from "@/stores/video";
import { useUserStore } from "@/stores/user";

const videoStore = useVideoStore();

const userStore = useUserStore();

onMounted(() => {
  videoStore.getVideoList();
});

</script>

<style scoped>
.video-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>