<template>
    <div>
        <RouterView />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from '@/util/axios';

const router = useRouter();
const articles = ref([]);


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
</script>

<style scoped>
</style>