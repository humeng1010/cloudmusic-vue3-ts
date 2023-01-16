<script setup lang="ts">
import { ref } from 'vue'
import LeftContent from './LeftContent/LeftContent.vue'
const showLeft = ref(false);
const showPopup = () => {
    showLeft.value = true;
};
</script>

<template>
    <van-cell @click="showPopup"><van-icon color="#000" :size="30" name="wap-nav" /></van-cell>
    <van-popup v-model:show="showLeft" position="left" :style="{ width: '80%', height: '100%' }">
        <LeftContent></LeftContent>
    </van-popup>
</template>

<style scoped lang="less">

</style>