<template>
    <div>
        <!-- 부위별 대신 운동 부위를 직접 명명할 메서드가 필요 -->
        <h2>부위별 운동 기록</h2>
    </div>
    <div>
        <p>원하는 부위를 선택하세요:</p>
            <select v-model="part">
              <option value="leg">하체</option>
              <option value="chest">가슴</option>
              <option value="back">등</option>
              <option value="shoulder">어깨</option>
              <option value="arm">팔</option>
              <option value="abs">복근</option>
              <option value="cardio">유산소</option>
              <!-- 부위에 따라 추가 -->
            </select>
          <button class="btn"  @click="recordStore.getPartExerciseList(part)">선택</button>
    </div>
    <!-- 여기에 부위List를 보여주고 select하면 part에 바인딩 하는게 필요  -->
    <div>
        <h2>최근 30 회 부위별 운동 정보</h2>
        <ul>
          <li v-for="(exercise, index) in recordStore.exerciseList" :key="index">
            <p><strong> {{ exercise.recordDate }}</strong></p>
            <p><strong>운동 종목:</strong> {{ exercise.exName }}</p>
            <p><strong>세트:</strong> {{ exercise.setNum }}</p>
            <p><strong>무게:</strong> {{ exercise.weight }}</p>
            <p><strong>횟수:</strong> {{ exercise.reps }}</p>
            <hr />
          </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRecordStore } from "@/stores/record";

const recordStore = useRecordStore();

const part = ref('');

</script>

<style scoped>

</style>