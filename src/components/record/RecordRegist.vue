<template>
  <div v-if="userStore.user">
    <!-- 만약 record를 생성하지 않았다면 보여줌 -->
    <div class="container">
      <h2 class="fs-2 fw-bold mb-5">{{ userStore.user.nickname }}의 운동 기록</h2>
      <!-- recordStore 생성, 레코드 넣는거 해야함 -->
      <!-- id 옆에 v-model 설정 필요 -->
      <!-- 버튼에 사용자의 정보를 담는 이벤트 추가 -->
      <!-- 따로따로 해야하는지 고민 -->
      <h3 class="fs-3 my-4">트레이너 및 신체정보 입력</h3>
      <fieldset class="rounded border p-3 mb-3">
        <div class="mb-3">
          <label for="trainner" class="form-label">트레이너</label>
          <select class="form-select" v-model="record.trainnerSeq">
            <option v-for="trainer in recordStore.trainers" :key="trainer.userSeq" :value="trainer.userSeq">
              {{ trainer.nickname }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="bodyWeight" class="form-label">몸무게</label>
          <input type="number" id="bodyWeight" class="form-control" v-model="record.bodyWeight" :disabled="userBodyInfoCheck" placeholder="몸무게를 입력해주세요 ex : 70 (kg)"/>
        </div>
        <div class="mb-3">
          <label for="bodyFatMass" class="form-label">체지방량 (kg)</label>
          <input type="number" id="bodyFatMass" class="form-control" v-model="record.bodyFatMass" :disabled="userBodyInfoCheck" placeholder="체지방량을 입력해주세요 ex : 10 (kg)"/>
        </div>
        <div class="mb-3">
          <label for="skeletalMuscleMass" class="form-label">골격근량 (kg)</label>
          <input type="number" id="skeletalMuscleMass" class="form-control" v-model="record.skeletalMuscleMass" :disabled="userBodyInfoCheck" placeholder="골격근량을 입력해주세요 ex : 35 (kg)"/>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary ms-3 mt-3" v-if="userBodyInfoCheck" @click="editBodyInfoCheck">정보 수정하기</button>
          <button class="btn btn-primary ms-3 mt-3" v-if="!userBodyInfoCheck && startEditingRecord" @click="editBodyInfoCheck">입력 완료</button>
          <button class="btn btn-primary ms-3 mt-3" @click="submitUserBodyInfo">시작하기</button>
        </div>
        
      </fieldset>
    </div>
    <!-- 운동 정보를 끝날때까지 입력 반복 -->
    <!-- 등록 버튼을 누르면 일단 정보를 가지고 보여주는 테이블 만들었으면 좋겠음 -->
    <!-- 해당 정보는 배열안에 저장하면서 보관 -->
    <div class="container" v-if="startEditingRecord">
      <h2 class="my-4">세트 정보</h2>
      <fieldset class="rounded border p-3 mb-3">
        <!-- recordId를 보여주면서? -->
        <!-- 운동 이름을 고르면 그 순서에 맞는 숫자를 운동 ID로 받아옴 -->
        <div class="mb-3">
          <label for="exId" class="form-label">운동</label>
          <select class="form-select" v-model="detail.exId">
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
          </select>
        </div>
        <div class="mb-3">
          <label for="setNum" class="form-label">세트</label>
          <input type="number" id="setNum" v-model="detail.setNum" class="form-control" placeholder="해당 운동이 몇 번째 세트인지 입력해주세요 ex : 1 (세트)"/>
        </div>
        <div class="mb-3">
          <label for="weight" class="form-label">무게</label>
          <input type="number" id="weight" v-model="detail.weight" class="form-control" placeholder="운동을 진행한 무게를 입력해주세요 ex : 100 (kg)"/>
        </div>
        <div class="mb-3">
          <label for="reps" class="form-label">횟수</label>
          <input type="number" id="reps" v-model="detail.reps" class="form-control" placeholder="운동을 진행한 횟수를 입력해주세요 ex : 10 (회)"/>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary" @click="submitUserExerciseSet">등록하기</button>
        </div>
      </fieldset>
    </div>
    <!-- 이 안에 리스트 표기 -->
    <div v-if="details.length > 0">
      <h2>세트 정보</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">운동 종목</th>
            <th scope="col">세트</th>
            <th scope="col">무게</th>
            <th scope="col">횟수</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in details" :key="index">
          <tr>
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ exMapper[item.exId] }}</td>
            <td>{{ item.setNum }} set</td>
            <td>{{ item.weight }} kg</td>
            <td>{{ item.reps }} 회</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="startEditingRecord" class="d-flex justify-content-center my-5">
      <button class="py-2 px-5 fs-3 btn btn-primary mt-3" @click="recordStore.createRecord(record)">완료</button>
    <!-- 이 버튼을 누르면 그동안의 운동 기록 배열과 시작할때 나의 정보를 함께 보냄 -->
    <!-- 아까 닫아놨던 운동시작 전 회원의 신체정보를 담는 박스 차단 풀어줌 -->
    <!-- 그 후 detail, details, record 모두 초기화 -->
    </div>
  </div>
  <div v-else>
    <h2 class="fs-2 fw-bold">로그인 후 이용해주세요</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useRecordStore } from "@/stores/record";

const userStore = useUserStore();

const recordStore = useRecordStore();

const detail = ref({
  exId: "",
  setNum: 1,
  weight: "",
  reps: ""
},
);

const details = ref([]);

const record = ref({
  userSeq: userStore.user.userSeq,
  trainnerSeq: "",
  bodyWeight: "",
  bodyFatMass: "",
  skeletalMuscleMass: "",
  details: details.value
});

const userBodyInfoCheck = ref(false);
const startEditingRecord = ref(false);

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

// 여기에 트레이너의 정보를 담을 배열 생성
onMounted(() => {
  recordStore.getTrainer();
});

const submitUserBodyInfo = function () {
  if (!(record.value.trainnerSeq && record.value.bodyWeight && record.value.bodyFatMass && record.value.skeletalMuscleMass)) {
    alert("오류: 제대로 입력 해야겠지??");
    return; // 함수 종료
  }
  startEditingRecord.value = true;
  userBodyInfoCheck.value = true;
}

const editBodyInfoCheck = function () {
  userBodyInfoCheck.value = !userBodyInfoCheck.value;
}

const submitUserExerciseSet = function () {
  // set 조건 추가
  if (!(detail.value.exId && detail.value.setNum && detail.value.weight && detail.value.reps)) {
    alert("오류: 제대로 입력 해야겠지??");
    return; // 함수 종료
  }

  // detail 객체를 details 배열에 추가
  details.value.push({
    exId: detail.value.exId,
    setNum: detail.value.setNum,
    weight: detail.value.weight,
    reps: detail.value.reps
  });

  // detail 객체 초기화
  // detail.value.exId = "";
  detail.value.setNum = detail.value.setNum + 1;
  // detail.value.weight = "";
  // detail.value.reps = "";
}

</script>

<style scoped></style>