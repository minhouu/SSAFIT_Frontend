<template>
    <div>
        <h2>나의 운동 기록</h2>
    </div>
    <div>
        <button @click = "openViewer">열기</button>
        <button @click = "closeViewer">닫기</button>
    </div>

    <div v-if="viewing">
        <ol>
          <!-- details 배열을 순회하면서 각 세트 정보를 보여줍니다 -->
          <li v-for="(exercise, index) in recordStore.exerciseList" :key="index">
            <!-- 운동 종목에 운동명을 문자로 넣어줄 메서드 필요-->
            <p><strong>운동 종목:</strong> {{ exercise.exName }}</p>
            <p><strong>운동 종목:</strong> {{ exercise.exPart }}</p>
            <p><strong>세트:</strong> {{ exercise.setNum }}</p>
            <p><strong>무게:</strong> {{ exercise.weight }}</p>
            <p><strong>횟수:</strong> {{ exercise.reps }}</p>
            <hr />
          </li>
        </ol>
      </div>
</template>

<script setup>
import { ref, onMounted} from "vue"
import { useRecordStore } from "@/stores/record";

onMounted(() => {
    recordStore.getAllExerciseList();
});

const recordStore = useRecordStore();

const viewing = ref(false);

const openViewer = function(){
    viewing.value = true;
}

const closeViewer = function(){
    viewing.value = false;
}

</script>

<style scoped>

</style>