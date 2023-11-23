<template>
  <div class="container">
    <div>
      <h2 class="fs-2 fw-bold mb-4">{{ userStore.user.nickname }}의 종목별 운동 기록</h2>
    </div>
    <div>
      <fieldset class="border rounded p-3 mb-3">
        <!-- recordId를 보여주면서? -->
        <!-- 운동 이름을 고르면 그 순서에 맞는 숫자를 운동 ID로 받아옴 -->
        <label for="ex-id" class="fs-5 form-label">기록을 확인하고 싶은 운동을 선택하세요</label>
        <select class="form-select" id="ex-id" v-model="exId">
          <option value="1">스쿼트</option>
          <option value="2">점프 스쿼트</option>
          <option value="3">데드리프트</option>
          <option value="4">레그 프레스</option>
          <option value="5">맨몸 런지</option>
          <option value="6">레그 컬</option>
          <option value="7">레그 익스텐션</option>
          <option value="8">벤치 프레스</option>
          <option value="9">딥스</option>
          <option value="10">푸쉬업</option>
          <option value="11">덤벨, 바벨 로우</option>
          <option value="12">턱걸이</option>
          <option value="13">렛풀다운</option>
          <option value="14">오버헤드 프레스</option>
          <option value="15">프론트레이즈</option>
          <option value="16">사이드 레터럴 레이즈</option>
          <option value="17">덤벨, 바벨 컬</option>
          <option value="18">덤벨 킥 백</option>
          <option value="19">트라이셉 익스텐션</option>
          <option value="20">윗몸 일으키기</option>
          <option value="21">크런치</option>
          <option value="22">레그레이즈</option>
          <option value="23">하늘 자전거</option>
          <option value="24">유산소</option>
        </select>
        <!-- 위에 정보를 들고 데이터를 받아옴 (userSeq, Exercise ID) -->
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary mt-3" @click="selectTap()">선택</button>
        </div>
      </fieldset>
    </div>

    <div v-if="recordStore.exerciseList.length > 0">
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
            <td>{{ exercise.setNum }} set</td>
            <td>{{ exercise.weight }} kg</td>
            <td>{{ exercise.reps }} 회</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div v-if="selectId !== ''">
        <h2>{{ recordStore.exName }}의 기록을 추가해주세요</h2>
      </div>
      <div class="mt-3" v-else>
        <h3>운동 종목을 선택해주세요</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRecordStore } from "@/stores/record";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const recordStore = useRecordStore();
const exId = ref('');
const selectId = ref('');

const selectTap = () => {
  recordStore.getIdExerciseList(exId.value);
  recordStore.getExerciseName(exId.value);
  selectId.value = exId.value;
}
onMounted(() => {
  recordStore.init();
})

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

</script>

<style scoped></style>