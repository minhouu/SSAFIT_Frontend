<template>
  <div>
    검색 결과 : {{ boardStore.searchKeyword }}
  </div>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
</script>

<style lang="scss" scoped>

</style>