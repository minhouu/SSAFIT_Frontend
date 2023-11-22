<template>
    <div>
        <h2>{{ userStore.user.nickname }}의 운동 기록</h2>
    </div>
    <div v-if="recordStore.records.length > 0">
        <table class="table" v-for="(record, index) in recordStore.records" :key="index">
          <tbody>
            <th scope="col">#</th>
              <th>
                <router-link to="/record/detail" @click="recordStore.getDetails(record.recordId)">{{ record.recordDate }}</router-link>
              </th>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h1>기록을 추가해주세요</h1>
    </div>
</template>

<script setup>
import { onMounted} from "vue"
import { useRecordStore } from "@/stores/record";
import { useUserStore } from "@/stores/user";

const recordStore = useRecordStore();

const userStore = useUserStore();

onMounted(() => {
  recordStore.getAllExerciseList();
});
</script>

<style scoped>

</style>














