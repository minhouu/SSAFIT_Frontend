<template>
    <div>
        <!-- 부위별 대신 운동 부위를 직접 명명할 메서드가 필요 -->
        <h2>{{userStore.user.nickname}}의 부위별 운동 기록</h2>
    </div>
    <div class="col-6">
        <p>원하는 부위를 선택하세요:</p>
            <select class="form-select" aria-label="Default select example" v-model="part">
              <option value="leg">하체</option>
              <option value="chest">가슴</option>
              <option value="back">등</option>
              <option value="shoulder">어깨</option>
              <option value="arm">팔</option>
              <option value="abs">복근</option>
              <option value="cardio">유산소</option>
              <!-- 부위에 따라 추가 -->
            </select>
          <button class="btn btn-primary mt-3"  @click="selectTap()">선택</button>
    </div>
    <!-- 여기에 부위List를 보여주고 select하면 part에 바인딩 하는게 필요  -->
    <div v-if = "recordStore.exerciseList.length > 0">
        <h2>최근 30 회 부위별 운동 정보</h2>
        <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">DATE</th>
                <th scope="col">운동 종목</th>
                <th scope="col">세트</th>
                <th scope="col">무게</th>
                <th scope="col">횟수</th>
              </tr>
            </thead>
            <tbody v-for="(exercise, index) in recordStore.exerciseList" :key="index">
              <tr>
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ exercise.recordDate}}</td>
                <td>{{ exercise.exName }}</td>
                <td>{{ exercise.setNum }}</td>
                <td>{{ exercise.weight }}</td>
                <td>{{ exercise.reps }}</td>
              </tr>
            </tbody>
      </table>
    </div>
    <div v-else>
      <div v-if=" selectPart !== '' ">
        <h2>{{ selectPart }}의 운동 기록을 추가해주세요</h2>
      </div>
      <div v-else>
        <h2>운동 부위를 선택해주세요</h2>
      </div>

    </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useRecordStore } from "@/stores/record";

const recordStore = useRecordStore();
const userStore = useUserStore();
const part = ref('');
const selectPart = ref("");


const selectTap = () =>{
  recordStore.getPartExerciseList(part.value);
  selectPart.value = part.value;
}


onMounted(() => {
  recordStore.init();
}) 
</script>

<style scoped>

</style>