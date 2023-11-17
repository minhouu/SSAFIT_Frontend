import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './user'
import axios from '@/util/axios'

export const useVideoStore = defineStore('video', () => {
  const router = useRouter();

  const userStore = useUserStore();

  const videoList = ref([]);

  const video = ref({});

  const isEditor = computed(() => {
    return video.value.writerSeq === userStore.user.userSeq;
  });

  const getVideoList = () => {
    axios({
      url: "video",
      method: "GET",
    })
      .then((res) => {
        videoList.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getVideo = (videoId) => {
    axios({
      url: `video/${videoId}`,
      method: "GET",
    })
      .then((res) => {
        video.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const createVideo = (newVideo) => {
    axios({
      url: "video",
      method: "POST",
      data: newVideo
    })
      .then(() => {
        router.push("/video");
      })
      .catch((err) => {
        console.log(err);
        alert("등록 실패");
      });
  };

  const deleteVideo = () => {
    if (confirm("정말 게시글을 삭제하시겠습니까?")) {
      axios({
        url: `video/${video.value.videoId}`,
        method: "DELETE",
      })
        .then((res) => {
          alert("삭제 완료");
          router.push("/video");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateVideo = () => {
    console.log(video.value)
    axios({
      url: `video/${video.value.videoId}`,
      method: "PUT",
      data: video.value,
    })
      .then((res) => {
        alert("수정 완료");
        router.push("/video");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    videoList,
    video,
    isEditor,
    getVideoList,
    getVideo,
    createVideo,
    deleteVideo,
    updateVideo,
  }
}, {
  persist: {
    storage: sessionStorage,
  }
})