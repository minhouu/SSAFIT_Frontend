<template>
    <div>
        <h2>{{ userStore.user.nickname }}의 운동 기록</h2>
    </div>
    <div>
        <ul>
          <!-- details 배열을 순회하면서 각 세트 정보를 보여줍니다 -->
          <li v-for="(record, index) in recordStore.records" :key="index">
            <!-- 운동 종목에 운동명을 문자로 넣어줄 메서드 필요-->
            <hr />
            <router-link to="/record/detail" @click="recordStore.getDetails(record.recordId)"><strong>{{ record.recordDate }}</strong></router-link>
            <hr />
          </li>
        </ul>
      </div>
</template>

<script setup>
import { ref, onMounted} from "vue"
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