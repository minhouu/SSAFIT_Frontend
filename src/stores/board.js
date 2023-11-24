import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import axios from '@/util/axios'

export const useBoardStore = defineStore('board', () => {
  /*
  states
  */
  const router = useRouter();

  const userStore = useUserStore();

  const articleList = ref([]);
  const article = ref({});

  // for pagination
  const page = ref(1);
  const totalPage = ref(1);

  // for search pagination
  const searchType = ref("");
  const searchKeyword = ref("");
  const searchPage = ref(1);
  const searchTotalPage = ref(1);

  /*
  getters
  */
  const isEditor = computed(() => {
    return article.value.writerSeq === userStore.user.userSeq;
  });

  /*
  actions
  */
  const clearBoardStore = () => {
    articleList.value = [];
    article.value={};
    searchPage.value = 1;
  }
  
  const createArticle = (newArticle) => {
    // 빈 요소 없는지 검증
    for (const key in newArticle) {
      if (newArticle[key] === "") return alert("모든 항목을 입력해주세요.");
    }
    if (newArticle.content.length < 10) return alert("내용은 10자 이상 입력해주세요.");
    if (newArticle.title.length < 5) return alert("제목은 5자 이상 입력해주세요.");

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

  const getArticleList = (pageNum) => {
    axios({
      url: `board`,
      method: "GET",
      params: {
        page: pageNum,
      },
    })
      .then((res) => {
        articleList.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArticleListBySearch = (pageNum, searchType, searchKeyword) => {
    console.log(pageNum, searchKeyword)
    axios({
      url: `board/search`,
      method: "GET",
      params: {
        type: searchType,
        page: pageNum,
        keyword: searchKeyword,
      },
    })
      .then((res) => {
        console.log(res.data)
        articleList.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getArticle = (id) => {
    // get one article
    axios({
      url: `board/${id}`,
      method: "GET",
    })
      .then((res) => {
        article.value = res.data;
        if (article.value.writerSeq != userStore.user.userSeq) {
          increaseViewCount(id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getCount = (inputSearchKeyword, inputSearchType) => {
    axios({
      url: `board/count`,
      method: "GET",
      params: {
        keyword: inputSearchKeyword,
        type: inputSearchType,
      },
    })
      .then((res) => {
        console.log(res.data)
        console.log(inputSearchKeyword)
        if (inputSearchKeyword === undefined && inputSearchType === undefined) {
        totalPage.value = Math.ceil(res.data / 10);
        } else {
          searchTotalPage.value = Math.ceil(res.data / 10);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const increaseViewCount = (id) => {
    axios({
      url: `board/${id}/view-cnt`,
      method: "GET",
    })
      .then((res) => {
        article.value.viewCnt++;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateArticle = () => {
    axios({
      url: `board/${article.value.articleId}`,
      method: "PUT",
      data: article.value,
    })
      .then((res) => {
        alert("수정 완료");
        router.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteArticle = () => {
    if (confirm("정말 게시글을 삭제하시겠습니까?")) {
      axios({
        url: `board/${article.value.articleId}`,
        method: "DELETE",
      })
        .then((res) => {
          alert("삭제 완료");
          router.push("/board");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return {
    articleList,
    article,
    isEditor,
    page,
    totalPage,
    searchType,
    searchKeyword,
    searchPage,
    searchTotalPage,
    clearBoardStore,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleList,
    getArticle,
    getCount,
    getArticleListBySearch,
  }
}, {
  persist: {
    storage: sessionStorage,
  }
})