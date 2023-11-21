<template>
  <ul style="margin-bottom: 40px;" class="nav nav-tabs">
    <li class="nav-item">
      <RouterLink :class="{active : board}" class="nav-link nav-setsize" to="/board">BOARD</RouterLink> 
    </li>
    <li class="nav-item">
      <RouterLink :class="{active : video}" class="nav-link nav-setsize" to="/video">VIDEO</RouterLink> 
    </li>
    <li class="nav-item">
      <RouterLink :class="{active : record}" class="nav-link nav-setsize" to="/record">RECORD</RouterLink> 
    </li>
  </ul>

</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();

const board = computed(() => {
  return route.path.startsWith('/board')
})
const video = computed(() => {
  return route.path.startsWith('/video') || route.path.startsWith('/review')
})
const record = computed(() => {
  return route.path.startsWith('/record')
})


</script>

<style scoped>
.nav-setsize {
  font-size: 1.8rem;
  padding: 0.7rem 2rem;
}
</style>