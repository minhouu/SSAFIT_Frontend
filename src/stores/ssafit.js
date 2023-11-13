import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('ssafit', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const user = ref(null);

  return { user }
})
