<template>
  <div>
    <div class="row">
      <div class="col-2">
        <RecodrNav />
      </div>
      <div class="col-10">
        <RouterView />
      </div>


    </div>

  </div>
</template>

<script setup>
import RecodrNav from '@/components/record/nav/RecodeNav.vue'
import { useUserStore } from '../stores/user';

const UserStore = useUserStore();

</script>

<style scoped></style>