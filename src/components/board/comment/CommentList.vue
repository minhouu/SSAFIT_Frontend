<template>
  <fieldset>
    <div class="d-flex justify-content-between">
      <h3>댓글</h3>
      <button class="btn btn-primary m-2" @click="commentStore.createComment(comment)">등록</button>
    </div>
    <div class="mb-4">
      <input type="text" class="form-control" id="comment-regist" v-model="comment.content" placeholder="내용을 입력해주세요">
    </div>
    <div v-if="commentStore.commentList.length">
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 10%;">작성자</th>
            <th style="width: 70%;">내용</th>
            <th style="width: 10%;">작성일시</th>
            <th style="width: 10%;"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(comment, index) in commentStore.commentList" :key="index">
            <td class="table-cell">{{ comment.nickname }}</td>
            <td class="table-cell">
              <!-- 댓글이 수정 중인지 확인하고, 수정 중이면 input으로 표시 -->
              <div v-if="isCommentEditing && editingIndex == index">
                <input class="form-control" type="text" v-model="commentBeforeEdit.content" />
              </div>
              <div v-else>
                {{ comment.content }}
              </div>
            </td>
            <td class="table-cell">{{ dateParser.formatDate(comment.createdAt) }}</td>
            <td class="table-cell" v-if="comment.writerSeq === userStore.user.userSeq">
              <!-- 수정 중인 경우에만 확인 및 취소 버튼 표시 -->
              <div v-if="isCommentEditing">
                <button class="btn btn-primary m-1 btn-sm"
                  @click="commentStore.updateComment(commentBeforeEdit)">확인</button>
                <button class="btn btn-primary m-1 btn-sm" @click="cancelEdit()">취소</button>
              </div>
              <!-- 수정 버튼 클릭 시 수정 모드로 전환 -->
              <div v-else>
                <button class="btn btn-primary m-1 btn-sm" @click="startCommentEditing(comment, index)">수정</button>
                <button class="btn btn-primary m-1 btn-sm" @click="commentStore.deleteComment(comment)">삭제</button>
              </div>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>댓글이 없습니다.</div>
  </fieldset>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCommentStore } from '@/stores/articleComment';
import { useUserStore } from '@/stores/user';
import { useDateParserStore } from '@/stores/dateParser';

const route = useRoute();
const router = useRouter();

const commentStore = useCommentStore();
const userStore = useUserStore();
const dateParser = useDateParserStore();

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

<style scoped>
.table-cell {
  vertical-align: middle;
}
</style>