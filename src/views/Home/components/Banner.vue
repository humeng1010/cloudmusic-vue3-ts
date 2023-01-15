<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBanner } from '@/api/index';
const banners = ref()

onMounted(async () => {
    const res = await getBanner(2)
    banners.value = res.data.banners

})


</script>

<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="banner in banners" :key="banner.id">
            <a :href="banner.url">
                <img :src="banner.pic" alt="">
            </a>
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