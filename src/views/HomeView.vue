<template>
  <div class="container my-5">
    <br />
    <div class="d-flex flex-column align-items-center">
      <h1 class="fs-1 fw-bold mb-5">{{ message }}</h1>
      <img class="img-fluid rounded" src="@\assets\home.png" />
      <div>HOW TO USE SSAFIT</div>
      <br />

    </div>
  </div>
</template>
  
<script setup>
const message = "SSAFIT에 오신 것을 환영합니다!";
</script>
  
<style scoped>
.custom-tooltip {
  --bs-tooltip-bg: var(--bd-violet-bg);
  --bs-tooltip-color: var(--bs-white);
}
</style>