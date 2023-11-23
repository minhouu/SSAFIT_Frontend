<template>
  <div v-if="recordStore.exerciseList.length > 0">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" style="width: 20%">운동 종목</th>
          <th scope="col" style="width: 20%">세트</th>
          <th scope="col" style="width: 20%">무게</th>
          <th scope="col" style="width: 20%">횟수</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-for="(exercise, index) in recordStore.exerciseList" :key="index">
        <tr>
          <td>{{ exMapper[exercise.exId] }}</td>
          <td>{{ exercise.setNum }} set</td>
          <td v-if="!(isEditing && editingIndex === index)">{{ exercise.weight }} kg</td>
          <td v-if="!(isEditing && editingIndex === index)">{{ exercise.reps }} 회</td>
          <td v-if="!(isEditing && editingIndex === index)"><button class="btn btn-primary"
              @click="startEditing(exercise, index)">수정</button></td>
          <td v-if="!(isEditing && editingIndex === index)"><button class="btn btn-primary"
              @click="recordStore.deleteRecord(exercise.recordId, exercise.detailId)">삭제</button></td>
          <td v-if="(isEditing && editingIndex === index)"><input type="text" id="weight" v-model="newExercise.weight"
              class="form-control w-50 me-1" style="display: inline-block;"/>kg</td>
          <td v-if="(isEditing && editingIndex === index)"><input type="text" id="reps" v-model="newExercise.reps"
              class="form-control w-50 me-1" style="display: inline-block;"/>회</td>
          <td v-if="(isEditing && editingIndex === index)"><button class="btn btn-primary"
              @click="endEditing">수정완료</button></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <h1>기록을 추가해주세요</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRecordStore } from "@/stores/record";
import { useRoute } from "vue-router";

const route = useRoute();

const recordStore = useRecordStore();
const editingIndex = ref(-1);
const isEditing = ref(false);

const newExercise = ref({});

const exMapper = {
  1: "스쿼트",
  2: "점프 스쿼트",
  3: "데드리프트",
  4: "레그 프레스",
  5: "맨몸 런지",
  6: "레그 컬",
  7: "레그 익스텐션",
  8: "벤치 프레스",
  9: "딥스",
  10: "푸쉬업",
  11: "덤벨, 바벨 로우",
  12: "턱걸이",
  13: "렛풀다운",
  14: "오버헤드 프레스",
  15: "프론트레이즈",
  16: "사이드 레터럴 레이즈",
  17: "덤벨, 바벨 컬",
  18: "덤벨 킥 백",
  19: "트라이셉 익스텐션",
  20: "윗몸 일으키기",
  21: "크런치",
  22: "레그레이즈",
  23: "하늘 자전거",
}

const startEditing = (exercise, index) => {
  isEditing.value = true;
  editingIndex.value = index;

  newExercise.value = exercise;
};

const endEditing = () => {
  isEditing.value = false;
  recordStore.updateRecord(newExercise.value);
  newExercise.value = {};

};

onMounted(() => {
  recordStore.getDetails(route.params.recordId);
});

</script>

<style scoped></style>