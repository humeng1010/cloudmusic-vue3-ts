<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBanner } from '@/api/index';
const banners = ref<{
    alg?: string,
    bannerId?: string,
    pic?: string
    url?: string
}[]>()

onMounted(async () => {
    try {
        const res = await getBanner(2)
        banners.value = res.data.banners
    } catch (error) {
        console.log(error)
    }

})
const gotoUrl = (url: string) => {
    if (url)
        location.href = url
}


</script>

<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="banner in banners" :key="banner.bannerId">
            <img :src="banner.pic" @click="gotoUrl(banner.url as string)" alt="">
        </van-swipe-item>

    </van-swipe>
</template>

<style scoped lang="less">
.my-swipe {
    margin: 10px;
    text-align: center;
    border-radius: 18px;
    max-width: 600px;

    @media screen and(min-width:600px) {
        margin: 10px auto;
    }

    img {
        width: 100%;
    }

}
</style>