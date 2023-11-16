import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from '@/util/axios'

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const user = ref(null);

  const createUser = (user) => {
    axios({
      url: "user",
      method: "POST",
      data : user
    })
      .then(() => {
        alert("등록 완료");
        router.push("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // api 추가 필요함
  const deleteUser = (user) => { 
    axios({
    url : "user",
    method : 'DELETE',
  })
  .then(() => {
        alert("삭제 완료");
        getUserList();
        router.push("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  
  };

  const login = (loginUser) => {
    axios({
          url: 'user/login',
          method: 'POST',
          data: loginUser
      })
      .then((res) => {
          user.value = {id: loginUser.id};
          user.value.nickname = res.data.nickname;
          user.value.userSeq = res.data.userSeq - 0;
          console.log(res)
          console.log(user)
          sessionStorage.setItem("access-token", res.data["access-token"])
          alert("로그인 성공");    
          router.push("/");
      })
      .catch((err) => {
          console.log(err)
          alert("로그인 실패");
          router.push("login");
      })

    user.id = "";
    user.value = "";
  };

  const logout = () => {
    user.value = null;
    axios({
        method: "get",
        url: "user/logout",
    })
    .then(() => {
        sessionStorage.removeItem("access-token");
        alert("로그아웃 성공");
        router.push("/");
    })
  };

  return { user, createUser, login, logout }
}, { persist: {
  storage: sessionStorage,
} })