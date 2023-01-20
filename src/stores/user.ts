import { getLoginStatus } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', async () => {
    const loginState = ref()
    const res = await getLoginStatus()
    console.log(res)

})