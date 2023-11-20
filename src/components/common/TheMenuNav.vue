<template>
  <div class="container" id="the-menu-nav">
    <RouterLink to="/board">
      <button type="button" class="btn btn-primary btn-lg">게시글 목록</button>
    </RouterLink> |
    <RouterLink to="/video" >
      <button type="button" class="btn btn-primary btn-lg">비디오 목록</button>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
#the-menu-nav {
  margin-bottom: 40px;
}
</style>