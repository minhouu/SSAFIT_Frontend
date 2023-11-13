<template>
    <div class="container">
      <br />
      <div class="text-center">
        <h1>{{ message }}</h1>
      </div>
      <br />
      <!-- <UserSearch /> -->
    </div>
  </template>
  
  <script setup>
  // import UserSearch from "@/components/user/UserSearch.vue";
  
  const message = "홈입니다.";
  </script>
  
  <style>
  .text-center {
    text-align: center;
  }
  </style>
  