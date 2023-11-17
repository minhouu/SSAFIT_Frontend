<template>
  <div v-if="!isEditing">
    <h2>비디오 상세 정보</h2>
    <fieldset>
      <h3>{{ videoStore.video.title }}</h3>
      <iframe width="560" height="315" :src="videoURL"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
      <div>작성자 : {{ videoStore.video.nickname }}</div>
      <div>조회수 : {{ videoStore.video.viewCnt }}</div>
      <div>작성일자 : {{ videoStore.video.createdAt }}</div>
      <div>부위 : {{ videoStore.video.part }}</div>
      <div>내용 : {{ videoStore.video.content }}</div>
      <button v-if="videoStore.isEditor" @click="startEditing">수정하기</button>
      <button v-if="videoStore.isEditor" @click="videoStore.deleteVideo()">삭제하기</button>
    </fieldset>
  </div>

  <div v-else>
    <h2>비디오 수정</h2>
    <fieldset>
      <div>작성자 : {{ videoStore.video.nickname }}</div>
      <label for="title">제목</label>
      <input type="text" id="title" v-model="videoStore.video.title"/><br />
      <label for="content">내용</label>
      <input type="text" id="content" v-model="videoStore.video.content"/><br />
      <label for="video-key">비디오 키</label>
      <input type="text" id="video-key" v-model="videoStore.video.videoKey"/><br />
      <label for="part">부위</label>
      <input type="text" id="part" v-model="videoStore.video.part"/><br />
      <button class="btn" @click="videoStore.updateVideo()">수정</button>
    </fieldset>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useVideoStore } from '@/stores/video';

const route = useRoute();

const videoStore = useVideoStore();

const isEditing = ref(false);

onMounted(() => {
  const videoId = route.params.id;
  videoStore.getVideo(videoId);
});

const startEditing = () => {
  isEditing.value = true;
};

const videoURL = computed(()=>{
    const videoKey = videoStore.video.videoKey;
    return `https://www.youtube.com/embed/${videoKey}`
})
</script>


<style scoped></style>