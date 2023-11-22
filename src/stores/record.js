import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import axios from '@/util/axios'

export const useRecordStore = defineStore('record', () => {
    const router = useRouter();
    
    const userStore = useUserStore();
    
    const trainers = ref([]);

    // part와 exercise record 조회 전용 배열
    const exerciseList = ref([]);

    // getBodyWeightList 전용 배열
    const bodyInfos = ref([]);

    //전체 조회 전용 배열
    const records = ref([]);

    //이름 조회 전용 변수
    const exName = ref('');

    const init = () => {
      exerciseList.value = [];
    }

    //detail(운동 상세 정보)를 받아서 한번에 insert할 예정
    //운동 기록 생성
    const createRecord = (record) => {
      if (!(record.trainnerSeq && record.bodyWeight && record.bodyFatMass && record.skeletalMuscleMass) ) {
        alert("오류: 레코드 값이 없습니다.");
        return; // 함수 종료
      }

      axios({
        url: "record",
        method: "POST",
        data: record,
        params: {
          "user-seq": userStore.user.userSeq
        }
      })
      .then((res) => {        
        alert("등록 완료");
        router.push("/record/detail");
        })
    };

    //운동기록 수정
    const updateRecord = (exercise) => {
      axios({
        url : `record/${exercise.recordId}/${exercise.detailId}`,
        method: "PUT",
        data: exercise,
        params: {
          "user-seq": userStore.user.userSeq
        }
      })
      .then((res) => {
        alert("수정 완료");
        //수정한 운동기록을 확인하는 페이지로 갔으면 좋겠음
        router.push("/record/detail");
      })
      .catch((err) => {
        console.log(err);
      });
    };
    
    //운동 기록 삭제
    const deleteRecord = (recordId, detailId) => {
      if (confirm("운동 세트를 삭제하시겠습니까?")) {
        axios({
          url: `record/${recordId}/${detailId}`,
          method: "DELETE",
          params: {
            "user-seq": userStore.user.userSeq
          }
        })
        .then((res) => {
          alert("삭제 완료");
          //전체 운동을 담고있던 record에 가서 내 운동 세트가 지워졌는지 확인
          router.push("/record/exercise");
        })
        .catch((err) => {
          console.log(err);
        });
      }
    };

    const deleteAllRecord = (record) => {
      if (confirm(`"${record.date}의 운동 기록을 삭제하시겠습니까?"`)) {
        axios({
          url: `record/${record.id}`,
          method: "DELETE",
          params: {
            "user-seq": userStore.user.userSeq
          }
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
          params: {
            "user-seq": userStore.user.userSeq
          }
        })
          .then((res) => {
            records.value = res.data;  
          })
          .catch((err) => {
              console.log(err);
          });
    };
    
    const getDetails = (recordId) => {
      console.log(recordId);
      axios({
        url: `record/${recordId}`,
        method: "GET",
        params: {
          "user-seq": userStore.user.userSeq
        }
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
        // 쿼리문으로 userSeq
        url: `record/part/${part}`,
        method: "GET",
        params: {
          "user-seq": userStore.user.userSeq
        }
      })
        .then((res) => {
            exerciseList.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    };
  
    // 2. 운동 종목별 목록
    const getIdExerciseList = (exId) => {
      axios({
        url: `record/exerciseName/${exId}`,
        method: "GET",
        params: {
          "user-seq": userStore.user.userSeq
        }
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
          params: {
            "user-seq": userStore.user.userSeq
          }
        })
          .then((res) => {
            bodyInfos.value = res.data;
          })
          .catch((err) => {
            console.log(err);
          });    
    };
    
    //4. 트레이너의 이름 가져오기
    const getTrainer = () => {
      axios({
        url: `record/trainner`,
        method: "GET",
      })
        .then((res) => {
          trainers.value = res.data
        })
        .catch((err) => {
          console.log(err);
        });    
      };

      const getExerciseName = (exId) => {
        console.log(exId)
        axios({
          url: `record/exercise/${exId}`,
          method: "GET",
        })
          .then((res) => {
            exName.value = res.data;
          })
          .catch((err) => {
            console.log(err);
          });    
      };
  

      //
    return { createRecord, updateRecord, deleteRecord, deleteAllRecord, getAllExerciseList, getPartExerciseList, getIdExerciseList, getBodyWeightList, getTrainer, getDetails, getExerciseName, init, trainers, exerciseList, bodyInfos, records, exName}
  }, { persist: {
    storage: sessionStorage,
  }})
