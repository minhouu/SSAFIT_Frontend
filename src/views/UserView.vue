<template>
  <div>
    <RouterView
      :users="users"
      @create-user="createUser"
      @update-user="updateUser"
      @delete-user="deleteUser"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

const router = useRouter();
const users = ref([]);

// 사용자 등록
const createUser = (user) => {
  const API_URL = `http://localhost:9999/userapi/user`;
  axios({
    url: API_URL,
    method: "POST",
    data : {
      id: user.id,
      password: user.password,
      name: user.name,
      email: user.email,
      age: user.age,
    },
  })
    .then(() => {
      alert("등록 완료");
      getUserList();
      router.push("/user");
    })
    .catch((err) => {
      console.log(err);
    });
};

// 사용자 삭제
const deleteUser = (user) => { axios({
  url : `http://localhost:9999/userapi/user/${user.id}`,
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

onMounted(() => {
  getUserList();
});
</script>

<style>
.user-link {
  color: black;
}

.view {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}

label {
  display: inline-block;
  width: 130px;
}

.btn {
  width: 8%;
  background-color: #d0d3d0;
  color: rgb(80, 82, 79);
  padding: 14px 20px;
  margin: 8px;
  border: 1px solid #787878;
  border-radius: 4px;
  font-size: large;
  cursor: pointer;
}

/* 테이블 CSS */
.user-list {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin: auto;
}

.user-list td,
.user-list th {
  border: 1px solid black;
}
</style>
