import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './user'
import axios from '@/util/axios'

export const useCommentStore = defineStore('comment', () => {
  const router = useRouter();

  const userStore = useUserStore();

  const commentList = ref([]);

  const getCommentList = (articleId) => {
    axios({
      url: `comment`,
      method: "GET",
      params: {
        "article-id": articleId
      }
    })
      .then((res) => {
        commentList.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const createComment = (newComment) => {
    newComment.writerSeq = userStore.user.userSeq;
    axios({
      url: "comment",
      method: "POST",
      data: newComment
    })
      .then(() => {
        router.go(0);
      })
      .catch((err) => {
        console.log(err);
        alert("등록 실패");
      });
  }

  const updateComment = (comment) => { 
    axios({
      url: "comment",
      method: "PUT",
      data: comment
    })
      .then(() => {
        alert("수정 성공");
        router.go(0);
      })
      .catch((err) => {
        console.log(err);
        alert("수정 실패");
      });
  }

  const deleteComment = (comment) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    if (userStore.user.userSeq !== comment.writerSeq) return alert("본인의 댓글만 삭제할 수 있습니다.");

    axios({
      url: `comment/${comment.commentId}`,
      method: "DELETE",
    })
      .then(() => {
        alert("삭제 성공");
        router.go(0);
      })
      .catch((err) => {
        console.log(err);
        alert("삭제 실패");
      });
  }

  return {
    commentList,
    getCommentList,
    createComment,
    updateComment,
    deleteComment,
  }
}, {
  persist: {
    storage: sessionStorage,
  }
})