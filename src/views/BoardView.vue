<template>
    <div>
        <RouterView 
            :articles="articles"
            @create-article="createArticle" 
            @update-article="updateArticle"
            @delete-article="deleteArticle" 
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from '@/util/axios';

const router = useRouter();
const articles = ref([]);

// // 게시글 목록 조회
// const getArticleList = () => {
//     axios({
//         url: "board",
//         method: "GET",
//     })
//         .then((res) => {
//             console.log(res.data);
//             articles.value = res.data;
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
// 게시글 등록
const createArticle = (article) => {
    axios({
        url: "board",
        method: "POST",
        data: {
            writerSeq: article.writerSeq,
            title: article.title,
            content: article.content,
        },
    })
        .then(() => {
            alert("등록 완료");
            getArticleList();
            router.push("/board");
        })
        .catch((err) => {
            console.log(err);
        });
};
// 게시글 수정
const updateArticle = (article) => {
    axios({
        url: `board/${article.id}`,
        method: "PUT",
        data: {
            id: article.id,
            writerSeq: article.writerSeq,
            title: article.title,
            content: article.content,
        },
    })
        .then(() => {
            alert("수정 완료");
            getArticleList();
            router.push("/board");
        })
        .catch((err) => {
            console.log(err);
        });
};
// 게시글 삭제
const deleteArticle = (article) => {
    axios({
        url: `board/${article.id}`,
        method: 'DELETE',
    })
        .then(() => {
            alert("삭제 완료");
            getArticleList();
            router.push("/board");
        })
        .catch((err) => {
            console.log(err);
        });

};
// onMounted(() => {
//     getArticleList();
// });

</script>

<style scoped>
.user-link {
  color: black;
}

.view {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}

label {
  display: inline-block;
  width: 130px;
}

.btn {
  width: 8%;
  background-color: #d0d3d0;
  color: rgb(80, 82, 79);
  padding: 14px 20px;
  margin: 8px;
  border: 1px solid #787878;
  border-radius: 4px;
  font-size: large;
  cursor: pointer;
}

/* 테이블 CSS */
.user-list {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin: auto;
}

.user-list td,
.user-list th {
  border: 1px solid black;
}
</style>