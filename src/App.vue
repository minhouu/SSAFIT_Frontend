<template>
  <div> 
    <TheHeaderNav />
    <router-view></router-view>
  </div>
</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: Arial, Helvetica, sans-serif;
}
.text-center {
  text-align: center;
}
.container {
  margin: 0px 30px;
}
</style>