<script setup lang="ts">
import { getDragonBall } from '@/api/index'
import { ref, onMounted } from 'vue';
const lists = ref<{
    homepageMode: string
    iconUrl: string
    id: number
    name: string
    resourceState: object
    skinSupport: boolean
    url: string

}[]>([])
try {
    const data = await getDragonBall()
    lists.value = data.data.data
} catch (error) {
    console.log(error)
}


/* 设置每日推荐日期,暂时这样处理吧 ╮(╯▽╰)╭ */
onMounted(() => {
    const badge = document.querySelector('#nav .van-badge__wrapper')
    const date = new Date()
    const day = date.getDate()
    const span_day = document.createElement('span')
    span_day.id = "span_day"
    span_day.style.color = '#fff'
    span_day.style.position = 'absolute'
    span_day.style.top = '50%'
    span_day.style.right = "50%"
    span_day.style.transform = "translate(50%, -50%)"
    span_day.innerText = day.toString()
    badge?.appendChild(span_day)
})

</script>

<template>
    <div id="nav">
        <van-grid :border="false" :gutter="6" :column-num="5" style="overflow: hidden;">
            <van-grid-item v-for="list in lists.slice(0, 5)" :key="list.id" :text="list.name" :to="list.url.slice(9)">
                <template #icon>
                    <!-- 调节图片的颜色 -->
                    <van-image :src="list.iconUrl"
                        style="filter: drop-shadow(-8000px 0px #ee0a24);transform: translateX(8000px);"></van-image>
                </template>
            </van-grid-item>
        </van-grid>
    </div>

</template>

<style scoped lang="less">

</style>