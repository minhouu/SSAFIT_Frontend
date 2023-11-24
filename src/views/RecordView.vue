<template>
  <div v-if="userStore.user">
    <div class="row">
      <div class="col-2">
        <RecodrNav />
      </div>
      <div class="col-10">
        <RouterView />
      </div>    </div>
  </div>

  <div class="container" v-else>
    <h2 class="fs-3 fw-bold">로그인 후 이용해주세요</h2>
  </div>
</template>

<script setup>
import RecodrNav from '@/components/record/nav/RecodeNav.vue'
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

</script>

<style scoped></style>