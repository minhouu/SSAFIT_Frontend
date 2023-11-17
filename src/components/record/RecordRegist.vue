<template>
    <!-- 만약 record를 생성하지 않았다면 보여줌 -->
    <div class="container">
      <h2>{{ userStore.user.nickname }}의 운동 기록</h2>
    <!-- recordStore 생성, 레코드 넣는거 해야함 -->
    <!-- id 옆에 v-model 설정 필요 -->
    <!-- 버튼에 사용자의 정보를 담는 이벤트 추가 -->
    <!-- 따로따로 해야하는지 고민 -->
      <fieldset class="text-center" v-if="UserBodyInfoCheck">
        <label for="bodyWeight">몸무게</label>
        <input type="text" id="bodyWeight" v-model="record.bodyWeight" class="view" /><br />
        <label for="bodyFatMass">체지방</label>
        <input type="text" id="bodyFatMass" v-model="record.bodyFatMass" class="view" /><br />
        <label for="skeletalMuscleMass">골격근량</label>
        <input type="text" id="skeletalMuscleMass" v-model="record.skeletalMuscleMass" class="view" /><br />
        <button class="btn" @click="submitUserBodyInfo">시작하기</button>
      </fieldset>
    </div>
    <!-- 운동 정보를 끝날때까지 입력 반복 -->
    <!-- 등록 버튼을 누르면 일단 정보를 가지고 보여주는 테이블 만들었으면 좋겠음 -->
    <!-- 해당 정보는 배열안에 저장하면서 보관 -->
    <div class="container" >
      <h2>세트 정보를 입력해 주세요</h2>
      <fieldset class="text-center">
        <!-- recordId를 보여주면서? -->
        <!-- 운동 이름을 고르면 그 순서에 맞는 숫자를 운동 ID로 받아옴 -->
        <label for="exId">운동선택</label>
        <select v-model="detail.exId">
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
        <br />
        <label for="setNum">세트</label>
        <input type="text" id="setNum" v-model="detail.setNum" class="view" /><br />
        
        <label for="weight">무게</label>
        <input type="text" id="weight" v-model="detail.weight" class="view" /><br />
        
        <label for="reps">횟수</label>
        <input type="text" id="reps" v-model="detail.reps" class="view" /><br />
        <!-- 등록하면 detalis에 추가하고 그 아래 details를 v-for 돌면서 리스트 보여주는 현황판?필요 -->
        <button class="btn" @click="">등록</button>
    </fieldset>
    </div>
    <!-- 이 버튼을 누르면 그동안의 운동 기록 배열과 시작할때 나의 정보를 함께 보냄 -->
    <!-- 아까 닫아놨던 운동시작 전 회원의 신체정보를 담는 박스 차단 풀어줌 -->
    <!-- 그 후 detail, details, record 모두 초기화 -->
    <button class="btn" @click="recordStore.createRecord(record,details)">등록 완료</button>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "@/stores/user";
import { useRecordStore } from "@/stores/record";

const userStore = useUserStore();

const recordStore = useRecordStore();

const record = ref({
    userSeq: userStore.user.userSeq,
    bodyWeight: "",
    bodyFatMass: "",
    skeletalMuscleMass: "",
  });


const detail = ref({
    exId: "",
    setNum: "",
    weight: "",
    reps: ""
},
);

const details = ref([]);

const UserBodyInfoCheck = ref(true);


const submitUserBodyInfo = function(){
    UserBodyInfoCheck.value = false;
}

const submitData = function(){
    UserBodyInfoCheck.value = true;
    UserBodyInfoCheck.value = true;
}
</script>

<style scoped>

</style>