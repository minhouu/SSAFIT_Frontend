<template>
  <div class="container" v-if="userStore.user">
    <h2>게시글 목록</h2>
    <div>
      <RouterLink to="/board/regist" >게시글 등록</RouterLink>
    </div>
    <hr>
    <div v-if="boardStore.articleList.length">
      <table class="article-list">
        <colgroup>
          <col style="width: 20%" />
          <col style="width: 20%" />
          <col style="width: 20%" />
          <col style="width: 30%" />
        </colgroup>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(article, index) in boardStore.articleList" :key="index" >
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
    </div>
    <div v-else>등록된 게시글이 없습니다.</div>
  </div>
  <div v-else>로그인 후 이용해주세요</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useBoardStore } from "@/stores/board";
import { useUserStore } from "@/stores/user";

const boardStore = useBoardStore();

const userStore = useUserStore();

onMounted(() => {
  boardStore.getArticleList();
}); 

</script>

<style scoped>

</style>