<template>
  <div class="container" v-if="userStore.user">
    <div class="board-list-top">
      <h2 class="fs-2 fw-bold mb-4">게시글 목록</h2>
      <RouterLink to="/board/regist">
        <button type="button" class="btn btn-primary">새 글 쓰기</button>
      </RouterLink>
    </div>

    <hr>
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
      <div class="row d-flex justify-content-between align-items-center">
        <div class="col-4">
          <ul class="pagination mt-3">
            <li class="page-item"><button :class="{ 'disabled': 1 === boardStore.page }" class="page-link"
                @click="setPage(boardStore.page - 1)">이전</button></li>
            <li class="page-item"><button v-if="boardStore.page - 2 > 0" class="page-link"
                @click="setPage(boardStore.page - 2)">{{ boardStore.page - 2 }}</button></li>
            <li class="page-item"><button v-if="boardStore.page - 1 > 0" class="page-link"
                @click="setPage(boardStore.page - 1)">{{ boardStore.page - 1 }}</button></li>
            <li class="page-item"><button class="page-link active" @click="setPage(boardStore.page)">{{ boardStore.page
            }}</button>
            </li>
            <li class="page-item"><button v-if="boardStore.page + 1 <= boardStore.totalPage" class="page-link"
                @click="setPage(boardStore.page + 1)">{{ boardStore.page + 1
                }}</button></li>
            <li class="page-item"><button v-if="boardStore.page + 2 <= boardStore.totalPage" class="page-link"
                @click="setPage(boardStore.page + 2)">{{ boardStore.page + 2
                }}</button></li>
            <li class="page-item"><button :class="{ 'disabled': boardStore.totalPage === boardStore.page }"
                class="page-link" @click="setPage(boardStore.page + 1)">다음</button></li>
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
      <h2 class="fs-3 fw-bold">등록된 게시글이 없습니다.</h2>
    </div>
  </div>
  <div class="container" v-else>
    <h2 class="fs-3 fw-bold">로그인 후 이용해주세요</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBoardStore } from "@/stores/board";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { useDateParserStore } from "@/stores/dateParser";

const router = useRouter();

const boardStore = useBoardStore();

const userStore = useUserStore();
const dateParser = useDateParserStore();

const searchKeyword = ref("");
const searchType = ref("title");


onMounted(() => {
  boardStore.getArticleList(boardStore.page);
  boardStore.getCount();
});

const setPage = (pageNum) => {
  if (pageNum < 1) return alert("첫 페이지 입니다.");
  // board 최대페이지 로직 추가필요

  boardStore.getCount();
  if (pageNum > boardStore.totalPage) return alert("마지막 페이지 입니다.");

  boardStore.page = pageNum;
  router.go(0);
};

const startSearch = () => {
  if (!searchKeyword.value) return alert("검색어를 입력해주세요");
  if (searchKeyword.value.length < 2) return alert("검색어는 2글자 이상 입력해주세요");
  boardStore.clearBoardStore();
  boardStore.searchKeyword = searchKeyword.value;
  boardStore.searchType = searchType.value;
  router.push({ name: "BoardSearch" });
};

</script>

<style scoped>
.board-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>