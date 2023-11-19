<template>
    <div>
        <!-- 부위별 대신 운동 부위를 직접 명명할 메서드가 필요 -->
        <h2>부위별 운동 기록</h2>
    </div>
    <div>
        <p>원하는 부위를 선택하세요:</p>
            <select v-model="part">
            <option value="reg">하체</option>
            <option value="chest">가슴</option>
            <option value="back">등</option>
            <option value="shoulder">어깨</option>
            <option value="arm">팔</option>
            <option value="abs">복근</option>
            <option value="">유산소</option>
            <!-- 부위에 따라 추가 -->
    </select>
    </div>
    <!-- 여기에 부위List를 보여주고 select하면 part에 바인딩 하는게 필요  -->
    <div>
        <h2>최근 ?? 회 부위별 운동 정보</h2>
        <ul>
          <!-- details 배열을 순회하면서 각 세트 정보를 보여줍니다 -->
          <li v-for="(item, index) in recordStore.getPartExerciseList(userStore.user.userSeq , part.value)" :key="index">
            <!-- 운동 종목에 운동명을 문자로 넣어줄 메서드 필요-->
            <p><strong>운동 종목:</strong> {{ item.exId }}</p>
            <p><strong>세트:</strong> {{ item.setNum }}</p>
            <p><strong>무게:</strong> {{ item.weight }}</p>
            <p><strong>횟수:</strong> {{ item.reps }}</p>
            <hr />
          </li>
        </ul>
      </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRecordStore } from "@/stores/record";

const userStore = useUserStore();

const recordStore = useRecordStore();

const part = ref('');

</script>

<style scoped>

</style>