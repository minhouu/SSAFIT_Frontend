<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <h2 class="fs-2 fw-bold mb-4">
        <span v-if="videoStore.searchType === 'title'">제목</span>
        <span v-if="videoStore.searchType === 'content'">내용</span>
        <span v-if="videoStore.searchType === 'writer'">작성자</span>
        검색 결과
      </h2>
      <div>
        <button type="button" class="btn btn-primary" @click="router.push('/video')">목록으로</button>
      </div>
      
    </div>

    <div v-if="videoStore.videoList.length">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(video, index) in videoStore.videoList" :key="index">
            <td>
              <RouterLink class="nav-link active" :to="`/board/${video.videoId}`">
                {{ video.title }}
              </RouterLink>
            </td>
            <td>{{ video.nickname }}</td>
            <td>{{ video.viewCnt }}</td>
            <td>{{ dateParser.formatDate(video.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
      <ul class="pagination mt-4">
        <li class="page-item"><button :class="{ 'disabled': 1 === videoStore.searchPage }" class="page-link"
            @click="setPage(videoStore.searchPage - 1)">이전</button></li>
        <li class="page-item"><button v-if="videoStore.searchPage - 2 > 0" class="page-link"
            @click="setPage(videoStore.searchPage - 2)">{{ videoStore.searchPage - 2 }}</button></li>
        <li class="page-item"><button v-if="videoStore.searchPage - 1 > 0" class="page-link"
            @click="setPage(videoStore.searchPage - 1)">{{ videoStore.searchPage - 1 }}</button></li>
        <li class="page-item"><button class="page-link active" @click="setPage(videoStore.searchPage)">{{
          videoStore.searchPage
        }}</button>
        </li>
        <li class="page-item"><button v-if="videoStore.searchPage + 1 <= videoStore.searchTotalPage" class="page-link"
            @click="setPage(videoStore.searchPage + 1)">{{ videoStore.searchPage + 1
            }}</button></li>
        <li class="page-item"><button v-if="videoStore.searchPage + 2 <= videoStore.searchTotalPage" class="page-link"
            @click="setPage(videoStore.searchPage + 2)">{{ videoStore.searchPage + 2
            }}</button></li>
        <li class="page-item"><button :class="{ 'disabled': videoStore.searchTotalPage === videoStore.searchPage }"
            class="page-link" @click="setPage(videoStore.searchPage + 1)">다음</button></li>
      </ul>
    </div>

    <div v-else>등록된 게시글이 없습니다.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useVideoStore } from "../../stores/video";
import { useDateParserStore } from "@/stores/dateParser";
import { useRouter } from "vue-router";

const router = useRouter();

const videoStore = useVideoStore();
const dateParser = useDateParserStore();

onMounted(() => {
  console.log(videoStore.searchType, videoStore.searchKeyword)
  videoStore.getCount(videoStore.searchKeyword, videoStore.searchType)
  videoStore.getVideoListBySearch(videoStore.searchPage, videoStore.searchType, videoStore.searchKeyword);
});

const setPage = (pageNum) => {
  if (pageNum < 1) return alert("첫 페이지 입니다.");
  // video 최대페이지 로직 추가필요

  videoStore.getCount(videoStore.searchKeyword, videoStore.searchType);
  if (pageNum > videoStore.searchTotalPage) return alert("마지막 페이지 입니다.");

  videoStore.searchPage = pageNum;
  router.go(0);
};
</script>

<style lang="scss" scoped></style>