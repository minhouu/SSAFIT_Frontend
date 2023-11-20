import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './user'
import axios from '@/util/axios'

export const useJjimStore = defineStore('jjim', () => {
  const router = useRouter();

  const userStore = useUserStore();

  const jjimList = ref([]);

  return {}
}, {
  persist: {
    storage: sessionStorage,
  }
})