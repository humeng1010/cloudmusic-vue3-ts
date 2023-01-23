<script setup lang="ts">
import type SearchDefault from '@/type/SearchDefault'
import { ref, watch } from 'vue';
import { getSearchSuggest } from '@/api/index'
import { useRouter } from 'vue-router'
const keyword = ref('')
const searchSuggest = ref<{ alg?: string, feature?: string, keyword?: string, lastKeyword?: string, type?: number }[]>([])
const router = useRouter()
defineProps<{
    searchDefault?: SearchDefault,
    disable?: boolean,
    autofocus?: boolean
}>()
// 接收打开搜索页面的自定义事件
const emit = defineEmits<{
    (e: 'openSearchPage'): void
}>()
const openSearchPage = () => {
    emit("openSearchPage")
}
let timer: number
watch(keyword, (value) => {
    if (!value.trim()) return
    clearTimeout(timer)
    timer = setTimeout(async () => {
        try {
            const res = await getSearchSuggest(value)
            searchSuggest.value = res.data.result.allMatch
        } catch (error) {
            console.log(error)
        }
    }, 500);
})
const searchSong = (keyword: string) => {
    console.log('@', keyword)
    if (!keyword.trim()) return

    router.push({ path: "/song-list", query: { keyword } })

}
</script>

<template>
    <div class="search">
        <div class="msg">
            <slot name="left"></slot>
        </div>
        <div class="search-main" @click="openSearchPage">
            <van-search left-icon="none" v-model="keyword" :autofocus="autofocus" :disabled="disable"
                :placeholder="searchDefault?.showKeyword" shape="round" autocomplete="off" />
        </div>
        <div class="scan">
            <slot name="right" :value="keyword"></slot>
        </div>
    </div>
    <div class="list" v-show="keyword">
        <van-list>
            <van-cell v-for="item, index in searchSuggest" :key="index" :title="item.keyword"
                @click="searchSong(item.keyword)" />
        </van-list>
    </div>
</template>

<style scoped lang="less">
.search {
    display: flex;
    justify-content: center;
    align-items: center;

    .msg {
        font-size: 30px;
        padding: 8px;
    }

    .search-main {
        flex: 1;
    }

    .scan {
        font-size: 30px;
        padding: 8px;
    }
}
</style>