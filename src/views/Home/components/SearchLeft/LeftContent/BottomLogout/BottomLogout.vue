<script setup lang="ts">
import { logout } from '@/api/index'
import { showToast } from 'vant'
const logoutCurrentUser = async () => {
    const res = await logout()
    // console.log(res.data)
    if (res.data.code === 200) {
        showToast('退出成功');
    }

}
</script>

<template>
    <van-button type="danger" size="large" round @click="logoutCurrentUser">退出登陆</van-button>
</template>

<style scoped lang="less">

</style>