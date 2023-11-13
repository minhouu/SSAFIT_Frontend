<template>
    <div class="container" v-if="store.user">
      <h2>게시글 등록</h2>
      <fieldset class="text-center">
        <div>이름 : {{ store.user.nickname }}</div>
        <label for="title">제목</label>
        <input type="text" id="title" v-model="article.title" class="view" /><br />
        <label for="content">내용</label>
        <input type="text" id="content" v-model="article.content" class="view" /><br />
        <button class="btn" @click="regist">등록</button>
      </fieldset>
    </div>
    <div v-else>로그인 후 이용해주세요</div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "@/util/axios";
  import { useRouter } from "vue-router";
  import { useStore } from "@/stores/ssafit";
  
  const router = useRouter();
  const emit = defineEmits(["create-article"]);
  const store = useStore();
  
  // writerSeq일 때 불러올 자신이 없음
  const article = ref({
    writerSeq: store.user.userSeq,
    title: "",
    content: "",
  });

  const regist = () => {
    console.log(article.value)
    axios({
      url: "board",
      method: "POST",
      data: article.value,
    })
    .then((res) => {        
      alert("등록 완료");
      router.push("/board");
      })
  };
  

  </script>
  