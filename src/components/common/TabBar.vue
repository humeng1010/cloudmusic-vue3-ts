<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0);
</script>

<template>
    <van-tabbar v-model="active" active-color="#ee0a24" vue-router>
        <van-tabbar-item to="/home" icon="wap-home-o">发现</van-tabbar-item>
        <van-tabbar-item to="/podcast" icon="service-o">播客</van-tabbar-item>
        <van-tabbar-item to="/me" icon="music-o">我的</van-tabbar-item>
        <van-tabbar-item to="/attention" icon="friends-o">关注</van-tabbar-item>
        <van-tabbar-item to="/community" icon="chat-o">社区</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped lang="less">

</style>