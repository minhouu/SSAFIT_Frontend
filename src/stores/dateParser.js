import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useDateParserStore = defineStore('date', () => {
  const formatDate = (dateString) => {
    // 주어진 문자열로부터 Date 객체 생성
    const targetDate = new Date(dateString);
  
    // 현재 시간과의 차이 계산 (밀리초 단위)
    const timeDifference = Date.now() - targetDate.getTime();
    if (timeDifference < 60 * 60 * 1000) {
      const minutes = Math.floor(timeDifference / (60 * 1000));
      // 1분 이내인 경우 '조금 전' 표시
      if (minutes < 1) {
        return '조금 전';
      } else {
        return `${minutes}분 전`;
      }
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      return `${hours}시간 전`;
    } else {
      // 24시간 이상인 경우
      return dateString.slice(0, 10);
    }
  };

  return {
    formatDate,
  }
}, {
  persist: {
    storage: sessionStorage,
  }
})