import { getLoginStatus } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const loginState = ref()

    const getUserInfo = async () => {
        const res = await getLoginStatus()
        // console.log(res)
        loginState.value = res.data.data.account
    }


    return {
        loginState,
        getUserInfo
    }

})