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
      <input type="text" id="title" v-model="newVideo.title"/><br />
      <label for="content">내용</label>
      <input type="text" id="content" v-model="newVideo.content"/><br />
      <label for="url">영상 링크</label>
      <input type="text" id="url" v-model="newVideo.url"/><br />
      <label for="part">부위</label>
      <select id="part" v-model="newVideo.part">
        <option value="abs">복근</option>
        <option value="arm">팔</option>
        <option value="back">등</option>
        <option value="cardio">유산소</option>
        <option value="chest">가슴</option>
        <option value="leg">다리</option>
        <option value="shoulder">어깨</option>
      </select><br />
      <button class="btn" @click="videoStore.updateVideo(newVideo)">수정</button>
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

const newVideo = ref({
  title: '',
  content: '',
  url: '',
  part: '',
});

onMounted(() => {
  const videoId = route.params.id;
  videoStore.getVideo(videoId);
});

const startEditing = () => {
  isEditing.value = true;
  newVideo.value = {
    videoId: videoStore.video.videoId,
    title: videoStore.video.title,
    content: videoStore.video.content,
    url: videoStore.video.url,
    part: videoStore.video.part,
  };
};

const videoURL = computed(()=>{
    const videoKey = videoStore.video.videoKey;
    return `https://www.youtube.com/embed/${videoKey}`
})
</script>


<style scoped></style>