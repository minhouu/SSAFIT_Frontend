<template>
    <div>
        <h2>운동 기록장 입니다.</h2>
        <nav>
            <router-link to="/record/regist">운동 기록하기</router-link> |
            <router-link to="/record/part">운동 부위별 기록 보기</router-link> |
            <router-link to="/record/exercise">운동별 기록 보기</router-link> |
            <router-link to="/record/body">신체 변화 기록 보기</router-link>
        </nav>
        <RouterView />
    </div>
</template>

<script setup>

</script>

<style scoped>
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