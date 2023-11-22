import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './user'
import axios from '@/util/axios'

export const useReviewStore = defineStore('review', () => {
  const router = useRouter();

  const userStore = useUserStore();

  const reviewList = ref([]);

  const review = ref({});

  const isEditor = computed(() => {
    return review.value.writerSeq === userStore.user.userSeq;
  });

  const getReviewList = (videoId) => {
    axios({
      url: `review`,
      method: "GET",
      params: {
        "video-id": videoId
      }
    })
      .then((res) => {
        reviewList.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getReview = (reviewId) => {
    axios({
      url: `review/${reviewId}`,
      method: "GET",
    })
      .then((res) => {
        review.value = res.data;
      })
      .then(() => {
        if (review.value.writerSeq != userStore.user.userSeq) {
          increaseViewCount(reviewId);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const createReview = (newReview) => {
    console.log(newReview)
    axios({
      url: "review",
      method: "POST",
      data: newReview
    })
      .then((res) => {
        alert("등록 완료");
        router.push(`/video/${newReview.videoId}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const updateReview = () => {
    axios({
      url: `review`,
      method: "PUT",
      data: review.value,
    })
      .then((res) => {
        alert("수정 완료");
        router.go(0);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteReview = () => {
    console.log(review.value.reviewId)
    if (confirm("정말 리뷰를 삭제하시겠습니까?")) {
      axios({
        url: `review/${review.value.reviewId}`,
        method: "DELETE",
      })
        .then((res) => {
          alert("삭제 완료");
          router.push(`/video/${review.value.videoId}`);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const increaseViewCount = (id) => {
    axios({
      url: `review/${id}/view-cnt`,
      method: "GET",
    })
      .then((res) => {
        review.value.viewCnt++;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return {
    reviewList,
    review,
    isEditor,
    getReviewList,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    increaseViewCount,
  }
}, {
  persist: {
    storage: sessionStorage,
  }
})