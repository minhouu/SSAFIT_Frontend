<template>
    <div v-if="recordStore.exerciseList.length > 0">
        <ul>
          <!-- details 배열을 순회하면서 각 세트 정보를 보여줍니다 -->
          <li v-for="(exercise, index) in recordStore.exerciseList" :key="index">
            <p><strong>운동 종목:</strong> {{ exercise.exName }}</p>
            <p><strong>세트:</strong> {{ exercise.setNum }}</p>
          <div v-if="!(isEditing && editingIndex === index)">
            <p><strong>무게:</strong> {{ exercise.weight }}</p>
            <p><strong>횟수:</strong> {{ exercise.reps }}</p>
            <button class="btn" @click="startEditing(exercise,index) ">수정</button>
          </div>  
          <div v-else>
            <label for="weight">무게</label>
            <input type="text" id="weight" v-model="newExercise.weight" class="view" /><br />
      
            <label for="reps">횟수</label>
            <input type="text" id="setNum" v-model="newExercise.reps" class="view" /><br />  
            <button  class="btn" @click="recordStore.updateRecord(newExercise) ">수정완료</button>
          </div>  
            <button class="btn" @click="recordStore.deleteRecord(exercise.recordId, exercise.detailId) ">삭제</button>
            <hr />
          </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRecordStore } from "@/stores/record";

const recordStore = useRecordStore();

const editingIndex = ref(-1);
const isEditing = ref(false);

const startEditing = (exercise, index) => {
  isEditing.value = true;
  editingIndex.value = index;
  
  newExercise.value = {
    weight: exercise.weight,
    reps: exercise.reps,
    recordId: exercise.recordId,
    detailId: exercise.detailId,
  };

};

const newExercise = ref({
  weight: '',
  reps: '',
  recordId: '',
  detailId: '',
});


</script>

<style scoped>

</style>