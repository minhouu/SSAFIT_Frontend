<template>
    <div>
        <h2>나의 운동 기록</h2>
    </div>
    <div>
        <ul>
          <!-- details 배열을 순회하면서 각 세트 정보를 보여줍니다 -->
          <li v-for="(item, index) in recordStore.getAllExerciseList(userStore.user.userSeq)" :key="index">
            <!-- 운동 종목에 운동명을 문자로 넣어줄 메서드 필요-->
            <p><strong>운동 종목:</strong> {{ item.exId }}</p>
            <p><strong>세트:</strong> {{ item.setNum }}</p>
            <p><strong>무게:</strong> {{ item.weight }}</p>
            <p><strong>횟수:</strong> {{ item.reps }}</p>
            <hr />
          </li>
        </ul>
      </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useRecordStore } from "@/stores/record";

const userStore = useUserStore();

const recordStore = useRecordStore();


</script>

<style scoped>

</style>