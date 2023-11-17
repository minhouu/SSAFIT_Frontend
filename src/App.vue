<template>
  <div class="container"> 
    <TheHeaderNav />
    <TheMenuNav />
    <router-view></router-view>
  </div>
</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';
import TheMenuNav from '@/components/common/TheMenuNav.vue';

</script>

<style scoped>
</style>