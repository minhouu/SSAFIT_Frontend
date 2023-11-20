import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import axios from '@/util/axios'

export const useRecordStore = defineStore('record', () => {
    const router = useRouter();
    
    const userStore = useUserStore();
    
    //detail(운동 상세 정보)를 받아서 한번에 insert할 예정
    //운동 기록 생성
    const createRecord = (record, exerciseList) => {
      axios({
        url: "record",
        method: "POST",
        data: record, exerciseList
      })
      .then((res) => {        
        alert("등록 완료");
        //완료시 내 전체 운동기록으로 감
        router.push("/record");
        })
    };

    //운동기록 수정
    const updateRecord = () => {
      axios({
        url : `record/${record.id}/${detail.id}`,
        method: "PUT",
        data: detail.value,
      })
      .then((res) => {
        alert("수정 완료");
        //수정한 운동기록을 확인하는 페이지로 갔으면 좋겠음
        router.push("/record");
      })
      .catch((err) => {
        console.log(err);
      });
    };
    
    //운동 기록 삭제
    const deleteRecord = () => {
      if (confirm("운동 세트를 삭제하시겠습니까?")) {
        axios({
          url: `record/${record.id}/${detail.id}`,
          method: "DELETE",
        })
        .then((res) => {
          alert("삭제 완료");
          //전체 운동을 담고있던 record에 가서 내 운동 세트가 지워졌는지 확인
          router.push("/record");
        })
        .catch((err) => {
          console.log(err);
        });
      }
    };

    const deleteAllRecord = () => {
      if (confirm(`"${record.date}의 운동 기록을 삭제하시겠습니까?"`)) {
        axios({
          url: `record/${record.id}`,
          method: "DELETE",
        })
        .then((res) => {
          alert("삭제 완료");
          router.push("/record");
        })
        .catch((err) => {
          console.log(err);
        });
      }
    };
  
    // 운동 기록 정보 조회
    // 0. 모든 기록 가져오기
    const getAllExerciseList = () => {
        axios({
          url: `record`,
          method: "GET",
        })
          .then((res) => {
              exerciseList.value = res.data;
          })
          .catch((err) => {
              console.log(err);
          });
      };
    
    
    // 1. 부위별 운동 목록
    const getPartExerciseList = (part) => {
      axios({
        url: `record/part/${part}`,
        method: "GET",
      })
        .then((res) => {
            exerciseList.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    };
  
    // 2. 운동 종목별 목록
    const getIdExerciseList = (id) => {

      axios({
        url: `record/exerciseName/${id}`,
        method: "GET",
      })
        .then((res) => {
          exerciseList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });    
    };

    // 3. 회원의 신체 변화 정보 가져오기
    // 몇개나 들고올지는 아직 미정
    const getBodyWeightList = () => {
        axios({
          url: `record/weight`,
          method: "GET",
        })
          .then((res) => {
            record.value = res.value
          })
          .catch((err) => {
            console.log(err);
          });    
    };
    
    // select recordId 꼭 필요한가?


    return { createRecord, updateRecord, deleteRecord, deleteAllRecord, getAllExerciseList, getPartExerciseList, getIdExerciseList, getBodyWeightList,}
  }, { persist: {
    storage: sessionStorage,
  }})
