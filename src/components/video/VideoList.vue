<template>
  <div class="container" v-if="userStore.user">
    <div class="video-list-top">
      <h2 class="fs-2 fw-bold my-2">비디오 목록</h2>
      <RouterLink to="/video/regist">
        <button type="button" class="btn btn-primary">새 비디오 추가하기</button>
      </RouterLink>
    </div>

    <hr>

    <div class="container" v-if="videoStore.videoList.length">
      <div class="video-card-store">
        <div v-for="(video, index) in videoStore.videoList" :key="index" class="card my-3" style="width: 30%;">
          <RouterLink class="nav-link active" :to="`/video/${video.videoId}`">
            <img :src="`https://img.youtube.com/vi/${video.videoKey}/mqdefault.jpg`" class="card-img-top img-thumbnail"
              alt="...">
            <div class="card-body">
              <h5 class="card-title">
                <!-- <RouterLink class="nav-link active" :to="`/video/${video.videoId}`">{{ video.title }}</RouterLink> -->
                {{ video.title }}
              </h5>
              <p class="card-text"></p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item card-item-text">
                <div class="card-item-text-header bg-light text-dark rounded">이름</div>
                <div>{{ video.nickname }}</div>
              </li>
              <li class="list-group-item card-item-text">
                <div class="card-item-text-header bg-light text-dark rounded">부위</div>
                <div>{{ partName[video.part] }}</div>
              </li>
              <li class="list-group-item card-item-text">
                <div class="card-item-text-header bg-light text-dark rounded">조회수</div>
                <div>{{ video.viewCnt }}</div>
              </li>
              <li class="list-group-item card-item-text">
                <div class="card-item-text-header bg-light text-dark rounded">작성 시간</div>
                <div>{{ dateParser.formatDate(video.createdAt) }}</div>
              </li>
            </ul>
          </RouterLink>
        </div>
      </div>
      <div class="row d-flex justify-content-between align-items-center my-5">
        <div class="col-4">
          <ul class="pagination m-0">
            <li class="page-item"><button :class="{ 'disabled': 1 === videoStore.page }" class="page-link"
                @click="setPage(videoStore.page - 1)">이전</button></li>
            <li class="page-item"><button v-if="videoStore.page - 2 > 0" class="page-link"
                @click="setPage(videoStore.page - 2)">{{ videoStore.page - 2 }}</button></li>
            <li class="page-item"><button v-if="videoStore.page - 1 > 0" class="page-link"
                @click="setPage(videoStore.page - 1)">{{ videoStore.page - 1 }}</button></li>
            <li class="page-item"><button class="page-link active" @click="setPage(videoStore.page)">{{ videoStore.page
            }}</button>
            </li>
            <li class="page-item"><button v-if="videoStore.page + 1 <= videoStore.totalPage" class="page-link"
                @click="setPage(videoStore.page + 1)">{{ videoStore.page + 1
                }}</button></li>
            <li class="page-item"><button v-if="videoStore.page + 2 <= videoStore.totalPage" class="page-link"
                @click="setPage(videoStore.page + 2)">{{ videoStore.page + 2
                }}</button></li>
            <li class="page-item"><button :class="{ 'disabled': videoStore.totalPage === videoStore.page }"
                class="page-link" @click="setPage(videoStore.page + 1)">다음</button></li>
          </ul>
        </div>
        <div class="row col-8">
          <select class="col form-select" v-model="searchType">
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="writer">작성자</option>
          </select>
          <div class="col input-group">
            <input type="text" class="form-control" placeholder="검색어를 입력하세요" v-model="searchKeyword" />
            <button class="btn btn-outline-primary" type="button" @click="startSearch">검색하기</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <h2 class="fs-3 fw-bold">등록된 비디오가 없습니다.</h2>
    </div>
  </div>
  <div class="container" v-else>
    <h2 class="fs-3 fw-bold">로그인 후 이용해주세요</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useVideoStore } from "@/stores/video";
import { useUserStore } from "@/stores/user";
import { useDateParserStore } from '@/stores/dateParser';

const router = useRouter();

const videoStore = useVideoStore();
const userStore = useUserStore();
const dateParser = useDateParserStore();

const searchKeyword = ref("");
const searchType = ref("title");

const partName = {
  chest: "가슴",
  back: "등",
  shoulder: "어깨",
  leg: "하체",
  arm: "팔",
  cardio: "유산소",
  abs: "복근",
}

onMounted(() => {
  videoStore.getVideoList(videoStore.page);
  videoStore.getCount();
});

const setPage = (pageNum) => {
  if (pageNum < 1) return alert("첫 페이지 입니다.");
  // board 최대페이지 로직 추가필요

  videoStore.getCount();
  if (pageNum > videoStore.totalPage) return alert("마지막 페이지 입니다.");

  videoStore.page = pageNum;
  videoStore.getVideoList(videoStore.page);
  router.go(0);
};

const startSearch = () => {
  if (!searchKeyword.value) return alert("검색어를 입력해주세요");
  if (searchKeyword.value.length < 2) return alert("검색어는 2글자 이상 입력해주세요");
  videoStore.clearVideoStore();
  videoStore.searchKeyword = searchKeyword.value;
  videoStore.searchType = searchType.value;
  router.push({ name: "VideoSearch" });
};
</script>

<style scoped>
.video-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.video-card-store {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-item-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-item-text-header {
  width: 30%;
  text-align: center;
  padding: 5px;
  margin: 3px;
}
</style>