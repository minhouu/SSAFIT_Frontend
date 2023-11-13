<template>
    <div>
      <h2>게시글 상세 정보</h2>
      <fieldset class="text-center">
        <div>{{ article.title }}</div>
        <div>{{ article.nickname }}</div>
        <div>{{ article.viewCnt }}</div>
        <div>{{ article.createdAt }}</div>
        <div>{{ article.content }}</div>
      </fieldset>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/util/axios';
import { useRoute } from 'vue-router';

const props = defineProps({
    articles: Array,
})

const route = useRoute();

const article = ref({});

const updateArticle = () => {
  emit("update-article", article.value);
};

const deleteArticle = () => {
  emit("delete-article", article.value);
};

onMounted(() => {
  const articleId = route.params.id;
  axios({
    url: `board/${articleId}`,
    method: "GET",
  })
    .then((res) => {
      article.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped>

</style>