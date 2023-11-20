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
        <h2>최근 ?? 회 부위별 운동 정보</h2>
        <ul>
          <!-- details 배열을 순회하면서 각 세트 정보를 보여줍니다 -->
          <li v-for="(exercise, index) in recordStore.exerciseList" :key="index">
            <p><strong>운동 종목:</strong> {{ exercise.exName }}</p>
            <p><strong>세트:</strong> {{ exercise.setNum }}</p>
          <div v-if="!newExercise.isEditing">
            <p><strong>무게:</strong> {{ exercise.weight }}</p>
            <p><strong>횟수:</strong> {{ exercise.reps }}</p>
          </div>  
          <div v-if="newExercise.isEditing">
            <label for="weight">무게</label>
            <input type="text" id="weight" v-model="newExercise.weight" class="view" /><br />
      
            <label for="reps">횟수</label>
            <input type="text" id="setNum" v-model="newExercise.reps" class="view" /><br />  
          </div>  
            <button class="btn" @click="recordStore.deleteRecord(exercise.recordId, exercise.detailId) ">삭제</button>
            <button v-if="!newExercise.isEditing" class="btn" @click="startEditing(exercise) ">수정</button>
            <button v-if="newExercise.isEditing" class="btn" @click="recordStore.updateRecord(newExercise) ">수정완료</button>
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

const startEditing = (exercise) => {
  newExercise.value = {
    isEditing: true,
    weight: exercise.weight,
    reps: exercise.reps,
    recordId: exercise.recordId,
    detailId: exercise.detailId,
  };
};

const newExercise = ref({
  isEditing: false,
  weight: '',
  reps: '',
  recordId: '',
  detailId: '',
});



</script>

<style scoped>

</style>