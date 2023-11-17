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

  return {  
    commentList,
    getCommentList,
    createComment,
  }
}, {
  persist: {
    storage: sessionStorage,
  }
})