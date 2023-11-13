import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/common/LoginForm.vue';
import HomeView from '@/views/HomeView.vue';
import BoardView from '@/views/BoardView.vue';
import BoardList from '@/components/board/BoardList.vue';
import BoardRegist from '@/components/board/BoardRegist.vue';
import BoardDetail from '@/components/board/BoardDetail.vue';
import User from "@/views/UserView.vue";
import UserRegist from "@/components/user/UserRegist.vue";
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
          name: "List",
          component: BoardList,
        }, 
        {
          path: ":id(\\d+)",
          name: "Detail",
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
      component: User,
      children: [
        {
          path: "regist",
          name: "UserRegist",
          component: UserRegist,
        },
      ],
    },

  ]
})

export default router
