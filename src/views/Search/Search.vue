<script setup lang="ts">
import Search from '@/components/common/Search.vue'
import { useSearchStore } from '@/stores/search'
const stores = useSearchStore()
let searchDefault = stores.searchDefault
// 如果没有数据
if (!searchDefault) {
    // 等待发送请求获取默认搜索内容
    await stores.getSearchDefaultFun()
    searchDefault = stores.searchDefault
}
// 点击按钮的 搜索的关键字
const goSearch = async (value: string) => {
    // console.log(value)


}


</script>

<template>
    <div class="search">
        <Search :searchDefault="searchDefault" :autofocus="true">
            <template #left>
                <van-icon @click="$router.back()" name="arrow-left" />
            </template>
            <template #right="{ value }">
                <van-icon @click="goSearch(value)" name="search" />
            </template>
        </Search>

    </div>

</template>

<style scoped lang="less">

</style>