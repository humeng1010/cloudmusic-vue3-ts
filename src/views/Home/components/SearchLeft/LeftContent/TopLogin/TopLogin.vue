<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => {
    router.push("/login")
}
</script>

<template>
    <div class="login-row">
        <div class="login">
            <van-image @click="login" round width="50px" height="50px"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" fit="cover" />
            <p @click="login">立即登陆</p>
            <van-icon name="arrow" :size="20" />
        </div>
    </div>
</template>

<style scoped lang="less">
.login-row {
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    .login {
        display: flex;
        justify-content: start;
        align-items: center;
        padding-left: 20px;
        padding-top: 10px;


        p {
            font-size: 20px;
            padding: 0 20px;
        }

    }
}
</style>