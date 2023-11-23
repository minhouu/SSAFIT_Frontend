<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <h2 class="fs-2 fw-bold mb-4">
        <span v-if="boardStore.searchType === 'title'">제목</span>
        <span v-if="boardStore.searchType === 'content'">내용</span>
        <span v-if="boardStore.searchType === 'writer'">작성자</span>
        검색 결과
      </h2>
      <div>
        <button type="button" class="btn btn-primary" @click="router.push('/board')">목록으로</button>
      </div>
      
    </div>

    <div v-if="boardStore.articleList.length">
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
          <tr v-for="(article, index) in boardStore.articleList" :key="index">
            <td>
              <RouterLink class="nav-link active" :to="`/board/${article.articleId}`">
                {{ article.title }}
              </RouterLink>
            </td>
            <td>{{ article.nickname }}</td>
            <td>{{ article.viewCnt }}</td>
            <td>{{ dateParser.formatDate(article.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
      <ul class="pagination mt-4">
        <li class="page-item"><button :class="{ 'disabled': 1 === boardStore.searchPage }" class="page-link"
            @click="setPage(boardStore.searchPage - 1)">이전</button></li>
        <li class="page-item"><button v-if="boardStore.searchPage - 2 > 0" class="page-link"
            @click="setPage(boardStore.searchPage - 2)">{{ boardStore.searchPage - 2 }}</button></li>
        <li class="page-item"><button v-if="boardStore.searchPage - 1 > 0" class="page-link"
            @click="setPage(boardStore.searchPage - 1)">{{ boardStore.searchPage - 1 }}</button></li>
        <li class="page-item"><button class="page-link active" @click="setPage(boardStore.searchPage)">{{
          boardStore.searchPage
        }}</button>
        </li>
        <li class="page-item"><button v-if="boardStore.searchPage + 1 <= boardStore.searchTotalPage" class="page-link"
            @click="setPage(boardStore.searchPage + 1)">{{ boardStore.searchPage + 1
            }}</button></li>
        <li class="page-item"><button v-if="boardStore.searchPage + 2 <= boardStore.searchTotalPage" class="page-link"
            @click="setPage(boardStore.searchPage + 2)">{{ boardStore.searchPage + 2
            }}</button></li>
        <li class="page-item"><button :class="{ 'disabled': boardStore.searchTotalPage === boardStore.searchPage }"
            class="page-link" @click="setPage(boardStore.searchPage + 1)">다음</button></li>
      </ul>
    </div>

    <div v-else>등록된 게시글이 없습니다.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useBoardStore } from "@/stores/board";
import { useDateParserStore } from "@/stores/dateParser";
import { useRouter } from "vue-router";

const router = useRouter();

const boardStore = useBoardStore();
const dateParser = useDateParserStore();

onMounted(() => {
  console.log(boardStore.searchType, boardStore.searchKeyword)
  boardStore.getCount(boardStore.searchKeyword, boardStore.searchType);
  boardStore.getArticleListBySearch(boardStore.searchPage, boardStore.searchType, boardStore.searchKeyword);
});

const setPage = (pageNum) => {
  if (pageNum < 1) return alert("첫 페이지 입니다.");
  // board 최대페이지 로직 추가필요

  boardStore.getCount(boardStore.searchKeyword, boardStore.searchType);
  if (pageNum > boardStore.searchTotalPage) return alert("마지막 페이지 입니다.");

  boardStore.searchPage = pageNum;
  router.go(0);
};
</script>

<style lang="scss" scoped></style>