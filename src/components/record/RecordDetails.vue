<template>
  <div v-if="recordStore.exerciseList.length > 0">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">운동 종목</th>
          <th scope="col">세트</th>
          <th scope="col">무게</th>
          <th scope="col">횟수</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(exercise, index) in recordStore.exerciseList" :key="index">
        <tr>
          <td>{{ exercise.exName }}</td>
          <td>{{ exercise.setNum }} set</td>
          <td v-if="!(isEditing && editingIndex === index)">{{ exercise.weight }} kg</td>
          <td v-if="!(isEditing && editingIndex === index)">{{ exercise.reps }} 회</td>
          <td v-if="!(isEditing && editingIndex === index)"><button class="btn btn-primary mt-3" @click="startEditing(exercise,index) ">수정</button></td>
          <td v-if="!(isEditing && editingIndex === index)"><button class="btn btn-primary mt-3" @click="recordStore.deleteRecord(exercise.recordId, exercise.detailId) ">삭제</button></td>
          <td v-if="(isEditing && editingIndex === index)"><input type="text" id="weight" v-model="newExercise.weight" class="form-control" />kg</td>
          <td v-if="(isEditing && editingIndex === index)"><input type="text" id="reps" v-model="newExercise.reps" class="form-control" />회</td>
          <td v-if="(isEditing && editingIndex === index)"><button  class="btn btn-primary mt-3" @click="endEditing">수정완료</button></td>
        </tr>
      </tbody>
    </table> 
    </div>
    <div v-else>
      <h1>기록을 추가해주세요</h1>
    </div>


</template>

<script setup>
import { ref } from "vue"
import { useRecordStore } from "@/stores/record";

const recordStore = useRecordStore();
const editingIndex = ref(-1);
const isEditing = ref(false);

const newExercise = ref({
  weight: '',
  reps: '',
  recordId: '',
  detailId: '',
});

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

const endEditing = () => {
  isEditing.value = false;
  recordStore.updateRecord(newExercise.value);
  newExercise.value = {
    weight: '',
    reps: '',
    recordId: '',
    detailId: '',
  };

};



</script>

<style scoped>

</style>