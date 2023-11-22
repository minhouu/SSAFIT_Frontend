<template>
  <div>
    <h2>신체 변화</h2>
    <div v-if ="recordStore.bodyInfos.length > 0">
      <canvas id="myChartCanvas"></canvas>
    </div>
    <div v-else>
      <h1>기록을 추가해주세요<br></h1>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRecordStore } from "@/stores/record";
import Chart from 'chart.js/auto';

const recordStore = useRecordStore();

const myChartCanvas = ref(null);

onMounted(() => {
  // myChartCanvas.value에 차트 캔버스를 할당
  myChartCanvas.value = document.getElementById('myChartCanvas');
  // 차트 생성
  if (myChartCanvas.value) {
    console.log(recordStore.bodyInfos);
    const newBodyWeightSet = recordStore.bodyInfos.map((v)=>v.bodyWeight);
    const newBodyFatMassSet = recordStore.bodyInfos.map((v)=>v.bodyFatMass);
    const newSkeletalMuscleMassSet = recordStore.bodyInfos.map((v)=>v.skeletalMuscleMass);
    const newDateSet = recordStore.bodyInfos.map((v)=>v.recordDate);
    const myChart = new Chart(myChartCanvas.value, {
      type: 'line',
      data: {
        labels: newDateSet,
        datasets: [
          {
            label: '몸무게',
            borderColor: '#2ecc71',
            data: newBodyWeightSet,
          },
          {
            label: '체지방량',
            borderColor: '#3498db',
            data: newBodyFatMassSet,
          },
          {
            label: '골격근량',
            borderColor: '#f87979',
            data: newSkeletalMuscleMassSet,
          },
        ],
      },
    });
  }
  recordStore.getBodyWeightList();
});

</script>

<style scoped>

</style>