<template>
  <div class="container" v-if="userStore.user">
    <div class="board-list-top">
      <h2>게시글 목록</h2>
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
            <td>{{ formatDate(article.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
      <ul class="pagination">
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
        <li class="page-item"><button :class="{ 'disabled': boardStore.totalPage === boardStore.page }" class="page-link"
            @click="setPage(boardStore.page + 1)">다음</button></li>
      </ul>
    </div>

    <div v-else>등록된 게시글이 없습니다.</div>
  </div>
  <div v-else>로그인 후 이용해주세요</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useBoardStore } from "@/stores/board";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();

const boardStore = useBoardStore();

const userStore = useUserStore();

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
  boardStore.getArticleList(boardStore.page);
  router.go(0);
};

const formatDate = (dateString) => {
  // 주어진 문자열로부터 Date 객체 생성
  const targetDate = new Date(dateString);

  // 현재 시간과의 차이 계산 (밀리초 단위)
  const timeDifference = Date.now() - targetDate.getTime();
  
  if (timeDifference < 60 * 60 * 1000) {
    const minutes = Math.floor(timeDifference / (60 * 1000));
    // 1분 이내인 경우 '조금 전' 표시
    if (minutes < 1) {
      return '조금 전';
    } else {
      return `${minutes}분 전`;
    }
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    // 24시간 이내의 경우
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    return `${hours}시간 전`;
  } else {
    // 24시간 이상인 경우
    return dateString.slice(0, 10);
  }
};
</script>

<style scoped>
.board-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>