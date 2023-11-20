<template>
  <div v-if="!isEditing">
    <fieldset>
      <legend>게시글 상세 정보</legend>
      <div>{{ boardStore.article.title }}</div>
      <div>{{ boardStore.article.nickname }}</div>
      <div>{{ boardStore.article.viewCnt }}</div>
      <div>{{ boardStore.article.createdAt }}</div>
      <div>{{ boardStore.article.content }}</div>
      <button v-if="boardStore.isEditor" @click="startEditing">수정하기</button>
      <button v-if="boardStore.isEditor" @click="boardStore.deleteArticle()">삭제하기</button>
    </fieldset>

    <fieldset>
      <legend>댓글</legend>
      <div v-if="commentStore.commentList.length">
        <input type="text" v-model="comment.content" />
        <button class="btn" @click="commentStore.createComment(comment)">등록</button>
        <table class="table">
          <thead>
            <tr>
              <th>작성자</th>
              <th>내용</th>
              <th>작성일시</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comment, index) in commentStore.commentList" :key="index">
              <td>{{ comment.nickname }}</td>
              <td>
                <!-- 댓글이 수정 중인지 확인하고, 수정 중이면 input으로 표시 -->
                <template v-if="isCommentEditing && editingIndex == index">
                  <input type="text" v-model="commentBeforeEdit.content" />
                </template>
                <template v-else>
                  {{ comment.content }}
                </template>
              </td>
              <td>{{ comment.createdAt }}</td>
              <td v-if="comment.writerSeq === userStore.user.userSeq">
                <!-- 수정 중인 경우에만 확인 및 취소 버튼 표시 -->
                <template v-if="isCommentEditing">
                  <button @click="commentStore.updateComment(commentBeforeEdit)">확인</button>
                  <button @click="cancelEdit()">취소</button>
                </template>
                <!-- 수정 버튼 클릭 시 수정 모드로 전환 -->
                <template v-else>
                  <button @click="startCommentEditing(comment, index)">수정하기</button>
                  <button @click="commentStore.deleteComment(comment)">삭제하기</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </fieldset>
  </div>

  <div v-else>
    <h2>게시글 수정</h2>
    <fieldset>
      <div>이름 : {{ boardStore.article.nickname }}</div>
      <label for="title">제목</label>
      <input type="text" id="title" v-model="boardStore.article.title" class="view" /><br />
      <label for="content">내용</label>
      <input type="text" id="content" v-model="boardStore.article.content" class="view" /><br />
      <button class="btn" @click="boardStore.updateArticle()">수정</button>
    </fieldset>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/board';
import { useCommentStore } from '../../stores/articleComment';
import { useUserStore } from '../../stores/user';

const route = useRoute();
const router = useRouter();

const boardStore = useBoardStore();
const commentStore = useCommentStore();
const userStore = useUserStore();

const comment = ref({
  content: '',
  articleId: route.params.id,
});

const commentBeforeEdit = ref({
});

const isCommentEditing = ref(false);
const editingIndex = ref(-1);

const isEditing = ref(false);

onMounted(() => {
  const articleId = route.params.id;
  boardStore.getArticle(articleId);
  commentStore.getCommentList(articleId);
});

const startCommentEditing = (comment, index) => {
  isCommentEditing.value = true;
  editingIndex.value = index;
  commentBeforeEdit.value = { ...comment };
};

const startEditing = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  isCommentEditing.value = false;
  router.go(0);
};
</script>


<style scoped></style>