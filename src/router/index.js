import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from '@/components/common/LoginForm.vue';

import HomeView from '@/views/HomeView.vue';

import BoardView from '@/views/BoardView.vue';
import BoardList from '@/components/board/BoardList.vue';
import BoardRegist from '@/components/board/BoardRegist.vue';
import BoardDetail from '@/components/board/BoardDetail.vue';

import UserView from "@/views/UserView.vue";
import UserRegist from "@/components/user/UserRegist.vue";
import UserDetail from "@/components/user/UserDetail.vue";
import Record from '@/views/RecordView.vue';
import RecordList from '@/components/record/RecordList.vue';
import RecordRegist from '@/components/record/RecordRegist.vue';
import RecordPart from '@/components/record/RecordPart.vue';
import RecordExercise from '@/components/record/RecordExercise.vue';

import VideoView from "@/views/VideoView.vue";
import VideoList from "@/components/video/VideoList.vue";
import VideoRegist from "@/components/video/VideoRegist.vue";
import VideoDetail from "@/components/video/VideoDetail.vue";

import ReviewDetail from "@/components/video/review/ReviewDetail.vue";
import ReviewRegist from "@/components/video/review/ReviewRegist.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginForm,
    },
    {
      path: "/board",
      name: "Board",
      component: BoardView,
      children: [
        {
          path: "",
          name: "BoardList",
          component: BoardList,
        }, 
        {
          path: ":id(\\d+)",
          name: "BoardDetail",
          component: BoardDetail,
        },
        {
          path: "regist",
          name: "BoardRegist",
          component: BoardRegist,
        },
      ]
    },
    {
      path: "/user",
      name: "User",
      component: UserView,
      children: [
        {
          //user의 회원 가입
          path: "regist",
          name: "UserRegist",
          component: UserRegist,
        },
        {
          path: "detail",
          name: "UserDetail",
          component: UserDetail,
        },
      ],
    },
    {
      path: "/record",
      component: Record,
      children: [
        {
          //record의 모든 정보
          path: "",
          name: "RecordList",
          component: RecordList,
        },
        {
          // record등록
          path: "regist",
          name: "RecordRegist",
          component: RecordRegist,
        },
        {
          // 해당 part의 record 보여주기
          path: "part/:part",
          name: "RecordPart",
          component: RecordPart,
        },
        {
          // 해당 exercise의 record 보여주기
          path: "exercise/:id",
          name: "RecordExercise",
          component: RecordExercise,
        },
      ],
    },
    {
      path: "/video",
      name: "Video",
      component: VideoView,
      children: [
        {
          path : "", 
          name : "VideoList", 
          component : VideoList
        },
        {
          path: "regist",
          name: "VideoRegist",
          component: VideoRegist,
        },
        {
          path: ":id(\\d+)",
          name: "VideoDetail",
          component: VideoDetail,
        }
      ],
    },
    {
      path: "/review",
      name: "Review",
      children : [
        {
          path: "regist/:videoId(\\d+)",
          name: "ReviewRegist",
          component: ReviewRegist,
        },
        {
          path: ":id(\\d+)",
          name: "ReviewDetail",
          component: ReviewDetail,
        },
      ]
    }
  ]
})

export default router
