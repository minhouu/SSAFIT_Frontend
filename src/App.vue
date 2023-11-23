<template>
  <div class="container"> 
    <TheHeaderNav />
    <router-view class="mx-3"></router-view>
    <div class="container" style="margin-top: 100px;"> 
      <TheFooter />
    </div>
    
  </div>
</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';
import TheFooter from '@/components/common/TheFooter.vue';

</script>

<style>
pre {
  font-family: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";;
}
</style>