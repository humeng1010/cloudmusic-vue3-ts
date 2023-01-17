<script setup lang="ts">

</script>

<template>
    <div class="not-fount">
        <div>
            页面没有找到哦
        </div>
        <a @click="$router.replace('/home')" style="text-decoration: underline;color: #e00;">点击我回到主页吧</a>
    </div>

</template>

<style scoped lang="less">
.not-fount {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>