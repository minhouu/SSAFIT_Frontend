<template>
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
              <div v-if="isCommentEditing && editingIndex == index">
                <input type="text" v-model="commentBeforeEdit.content" />
              </div>
              <div v-else>
                {{ comment.content }}
              </div>
            </td>
            <td>{{ comment.createdAt }}</td>
            <td v-if="comment.writerSeq === userStore.user.userSeq">
              <!-- 수정 중인 경우에만 확인 및 취소 버튼 표시 -->
              <div v-if="isCommentEditing">
                <button @click="commentStore.updateComment(commentBeforeEdit)">확인</button>
                <button @click="cancelEdit()">취소</button>
              </div>
              <!-- 수정 버튼 클릭 시 수정 모드로 전환 -->
              <div v-else>
                <button @click="startCommentEditing(comment, index)">수정하기</button>
                <button @click="commentStore.deleteComment(comment)">삭제하기</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </fieldset>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCommentStore } from '@/stores/articleComment';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const commentStore = useCommentStore();
const userStore = useUserStore();

const comment = ref({
  content: '',
  articleId: route.params.id,
});

const isCommentEditing = ref(false);

const editingIndex = ref(-1);

const commentBeforeEdit = ref({
});

onMounted(() => {
  const articleId = route.params.id;
  commentStore.getCommentList(articleId);
});

const startCommentEditing = (comment, index) => {
  isCommentEditing.value = true;
  editingIndex.value = index;
  commentBeforeEdit.value = { ...comment };
};

const cancelEdit = () => {
  isCommentEditing.value = false;
  router.go(0);
};
</script>

<style scoped></style>