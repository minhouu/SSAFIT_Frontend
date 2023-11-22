import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from '@/util/axios'

export const useUserStore = defineStore('user', () => {
  const router = useRouter();

  const user = ref(null);

  const checkBeforeCreate = (newUser) => {
    if (newUser.id === "") {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (newUser.nickname === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (newUser.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (newUser.password !== newUser.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (newUser.age === 0) {
      alert("나이를 입력해주세요.");
      return;
    }
    axios({
      url: `user/${newUser.id}`,
      method: "GET",
    })
      .then((res) => {
        createUser(newUser);
        alert("회원가입이 완료되었습니다. 새로 로그인 해주세요.");
      })
      .catch((err) => {
        console.log(err);
        alert("아이디 중복");
      })
  }

  const createUser = (newUser) => {
    axios({
      url: "user/join",
      method: "POST",
      data: newUser
    })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("등록 실패");
      });
  };

  // api 추가 필요함
  const deleteUser = (user) => {
    axios({
      url: "user",
      method: 'DELETE',
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
        user.value = { id: loginUser.id };
        user.value.nickname = res.data.nickname;
        user.value.userSeq = res.data.userSeq - 0;
        sessionStorage.setItem("access-token", res.data["access-token"])
        alert("로그인 성공");
        router.push("/");
        router.go(0);
      })
      .catch((err) => {
        console.log(err)
        alert("아이디와 비밀번호를 확인해주세요");
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
        sessionStorage.clear();
        alert("로그아웃 성공");
        router.push("/");
      })
  };

  return { user, checkBeforeCreate, login, logout }
}, {
  persist: {
    storage: sessionStorage,
  }
})