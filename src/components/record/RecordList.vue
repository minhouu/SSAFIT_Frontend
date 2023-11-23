<template>
  <div class="container" v-if="userStore.user">
    <div>
      <h2 class="fs-2 fw-bold mb-5">{{ userStore.user.nickname }}의 운동 기록</h2>
    </div>
    <div v-if="recordStore.records.length > 0">
      <table class="table">
        <tbody>
          <tr>
            <th scope="col">#</th>
            <th scope="col">운동 날짜</th>
          </tr>
          <tr v-for="(record, index) in recordStore.records" :key="index">
            <td scope="col">{{ index + 1 }}</td>
            <td>
              <router-link :to="`/record/${record.recordId}`">{{ record.recordDate
              }}</router-link>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <div class="text-center my-3" v-else>
      <h3>기록을 추가해주세요..!</h3>
    </div>
  </div>
  <div v-else>
    <h2 class="fs-2 fw-bold">로그인 후 이용해주세요</h2>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useRecordStore } from "@/stores/record";
import { useUserStore } from "@/stores/user";

const recordStore = useRecordStore();

const userStore = useUserStore();

onMounted(() => {
  recordStore.getAllExerciseList();
});
</script>

<style scoped></style>














