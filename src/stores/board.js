import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import axios from '@/util/axios'

export const useBoardStore = defineStore('board', () => {
  const router = useRouter();
  
  const userStore = useUserStore();
  
  const articleList = ref([]);
  
  const article = ref({});

  const isEditor = computed(() => {
    return article.value.writerSeq === userStore.user.userSeq;
  });

  const updateArticle = () => {
    axios({
      url : `board/${article.value.articleId}`,
      method: "PUT",
      data: article.value,
    })
    .then((res) => {
      alert("수정 완료");
      router.push("/board");
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  const deleteArticle = () => {
    emit("delete-article", article.value);
  };

  const createArticle = (newArticle) => {
    axios({
      url: "board",
      method: "POST",
      data: newArticle,
    })
    .then((res) => {        
      alert("등록 완료");
      router.push("/board");
      })
  };
  

  const getArticleList = () => {
    axios({
      url: `board`,
      method: "GET",
    })
      .then((res) => {
        articleList.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArticle = (id) => {
    axios({
      url: `board/${id}`,
      method: "GET",
    })
      .then((res) => {
        article.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return { articleList, article, isEditor, createArticle, updateArticle, getArticleList, getArticle }
}, { persist: {
  storage: sessionStorage,
}})