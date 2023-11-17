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

import VideoView from "@/views/VideoView.vue";
import VideoList from "@/components/video/VideoList.vue";
import VideoRegist from "@/components/video/VideoRegist.vue";
import VideoDetail from "@/components/video/VideoDetail.vue";

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
          path: "regist",
          name: "UserRegist",
          component: UserRegist,
        },
        {
          path: "detail",
          name: "UserDetail",
          component: UserDetail,
        }
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
    }
  ]
})

export default router
