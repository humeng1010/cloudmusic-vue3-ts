import { ref } from 'vue'
import { defineStore } from 'pinia'
import type SearchDefault from '@/type/SearchDefault'
import { getSearchDefault } from '@/api/index'

export const useSearchStore = defineStore('search', () => {
  // 默认搜索关键字state
  const searchDefault = ref<SearchDefault>()
  // async
  const getSearchDefaultFun = async () => {
    try {
      const { data } = await getSearchDefault()
      searchDefault.value = data.data
    } catch (error) {
      console.log(error)
    }
  }



  return { searchDefault, getSearchDefaultFun }
})
