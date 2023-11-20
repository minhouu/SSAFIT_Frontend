<template>
    <div>
        <h2>신체 변화</h2>
        <ul>
          <!-- details 배열을 순회하면서 각 세트 정보를 보여줍니다 -->
          <li v-for="(bodyInfo, index) in recordStore.bodyInfos" :key="index">
            <p><strong>몸무게 : </strong> {{ bodyInfo.bodyWeight}}</p>
            <p><strong>체지방량 : </strong> {{ bodyInfo.bodyFatMass }}</p>
            <p><strong>골격근량 : </strong> {{ bodyInfo.skeletalMuscleMass }}</p>
            <hr />
          </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRecordStore } from "@/stores/record";

const recordStore = useRecordStore();

onMounted(() => {
    recordStore.getBodyWeightList();
});

</script>

<style scoped>

</style>