<template>
  <div class="container">
    <div>
      <h2 class="fs-2 fw-bold mb-4">{{ userStore.user.nickname }}의 부위별 운동 기록</h2>
    </div>
    <div>
      <fieldset class="border rounded p-3 mb-3">
        <label for="ex-part" class="fs-5 form-label">기록을 확인하고 싶은 운동을 선택하세요</label>
        <select class="form-select" id="ex-part" v-model="part">
          <option value="leg">하체</option>
          <option value="chest">가슴</option>
          <option value="back">등</option>
          <option value="shoulder">어깨</option>
          <option value="arm">팔</option>
          <option value="abs">복근</option>
          <!-- 부위에 따라 추가 -->
        </select>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary mt-3" @click="selectTap()">선택</button>
        </div>
      </fieldset>
    </div>

    <!-- 여기에 부위List를 보여주고 select하면 part에 바인딩 하는게 필요  -->
    <div v-if="recordStore.exerciseList.length > 0">
      <h3 class="my-4 fs-4 fw-bold">최근 30 회 부위별 운동 정보</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">날짜</th>
            <th scope="col">운동 종목</th>
            <th scope="col">세트</th>
            <th scope="col">무게</th>
            <th scope="col">횟수</th>
          </tr>
        </thead>
        <tbody v-for="(exercise, index) in recordStore.exerciseList" :key="index">
          <tr>
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ exercise.recordDate }}</td>
            <td>{{ exMapper[exercise.exId] }}</td>
            <td>{{ exercise.setNum }}</td>
            <td>{{ exercise.weight }}</td>
            <td>{{ exercise.reps }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div v-if="selectPart !== ''">
        <h2>운동 기록을 추가해주세요</h2>
      </div>
      <div class="mt-3" v-else>
        <h3>운동 부위를 선택해주세요</h3>
      </div>

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

const selectTap = () => {
  recordStore.getPartExerciseList(part.value);
  selectPart.value = part.value;
}

onMounted(() => {
  recordStore.init();
}) 
</script>

<style scoped></style>