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
      <table class="table">
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
              <RouterLink class="article-datail" :to="`/board/${article.articleId}`">
                {{ article.title }}
              </RouterLink>
            </td>
            <td>{{ article.nickname }}</td>
            <td>{{ article.viewCnt }}</td>
            <td>{{ article.createdAt }}</td>
          </tr>
        </tbody>
      </table>
      <ul class="pagination">
        <li class="page-item"><button class="page-link" @click="setPage(boardStore.page - 1)">Previous</button></li>
        <li class="page-item"><button v-if="boardStore.page - 2 > 0" class="page-link"
            @click="setPage(boardStore.page - 2)">{{ boardStore.page - 2 }}</button></li>
        <li class="page-item"><button v-if="boardStore.page - 1 > 0" class="page-link"
            @click="setPage(boardStore.page - 1)">{{ boardStore.page - 1 }}</button></li>
        <li class="page-item"><button  style="font-weight: bold;" class="page-link" @click="setPage(boardStore.page)">{{ boardStore.page }}</button>
        </li>
        <li class="page-item"><button class="page-link" @click="setPage(boardStore.page + 1)" >{{ boardStore.page + 1
        }}</button></li>
        <li class="page-item"><button class="page-link" @click="setPage(boardStore.page + 2)">{{ boardStore.page + 2
        }}</button></li>
        <li class="page-item"><button class="page-link" @click="setPage(boardStore.page + 1)">Next</button></li>
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
});

const setPage = (pageNum) => {
  if (pageNum < 1) return alert("첫 페이지 입니다.");
  // board 최대페이지 로직 추가필요
  
  // const totalCount = boardStore.getCount();
  // const totalPage = Math.ceil(totalCount / 10);
  // if (pageNum >= totalPage) return alert("마지막 페이지 입니다.");

  boardStore.page = pageNum;
  boardStore.getArticleList(boardStore.page);
  router.go(0);
};

</script>

<style scoped>
.board-list-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</style>