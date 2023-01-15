<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import Search from '@/components/common/Search.vue'
const stores = useSearchStore()
let searchDefault = stores.searchDefault
// 如果没有数据
if (!searchDefault) {
    // 等待发送请求获取默认搜索内容
    await stores.getSearchDefaultFun()
    searchDefault = stores.searchDefault
}

const router = useRouter()
const openSearchPage = () => {
    router.push("/search")
}
</script>

<template>
    <Search :searchDefault="searchDefault" :disable="true" @openSearchPage="openSearchPage">
        <template #left>
            <van-icon name="wap-nav" />
        </template>
        <template #right>
            <van-icon name="enlarge" />
        </template>
    </Search>

</template>

<style scoped lang="less">

</style>