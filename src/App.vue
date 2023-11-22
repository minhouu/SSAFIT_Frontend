<template>
  <div class="container"> 
    <TheHeaderNav />
    <router-view class="mx-3"></router-view>
    <footer class="my-5"></footer>
  </div>
</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';

</script>

<style>
pre {
  font-family: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";;
}
</style>