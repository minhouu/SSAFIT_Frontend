<template>
  <div>
    <ul class="text-center nav flex-column border border-primary rounded" v-if="userStore.user">
      <li class="nav-item my-2">
        <RouterLink class="nav-link active" to="/record">
          <h2 class="fw-bold my-3">운동기록</h2>
        </RouterLink> 
      </li>
      <li class="nav-item my-2">
        <RouterLink class="nav-link active" to="/record/regist">기록하기</RouterLink>
      </li>
      <li class="nav-item my-2">
        <RouterLink class="nav-link active" to="/record">날짜별 운동 기록</RouterLink>
      </li>
      <li class="nav-item my-2">
        <RouterLink class="nav-link active" to="/record/part">부위별 운동 기록</RouterLink>
      </li>
      <li class="nav-item my-2">
        <RouterLink class="nav-link active" to="/record/exercise">종목별 운동 기록</RouterLink>
      </li>
      <li class="nav-item my-2 mb-3">
        <RouterLink class="nav-link active" to="/record/body">신체 변화 기록</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style scoped></style>