<template>
    <div>
        <h2>운동별 기록</h2>
    </div>
    <div class="container" >
     <h2>기록을 확인하고 싶은 운동을 선택하세요</h2>
     <fieldset class="text-center">
        <!-- recordId를 보여주면서? -->
        <!-- 운동 이름을 고르면 그 순서에 맞는 숫자를 운동 ID로 받아옴 -->
        <label for="exId">운동 목록</label>
        <select v-model="exId">
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
        <button class="btn" @click="recordStore.getIdExerciseList(exId)">선택</button>
     </fieldset>
    </div>
    <div>
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
import {ref} from "vue";
import { useRecordStore } from "@/stores/record";

const recordStore = useRecordStore();

const exId = ref('');

</script>

<style scoped>

</style>