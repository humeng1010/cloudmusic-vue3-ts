<script setup lang="ts">
import { ref } from 'vue';
import { captcha_sent, captcha_verify, getUserAccountInfo } from '@/api/index'
import { showNotify } from 'vant';
import { useRouter } from 'vue-router'
const router = useRouter()
const sendDisable = ref(false)
const sendTime = ref(60)
const phone = ref('');
const captcha = ref('');
const pattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
const sendCaptcha = async () => {
    if (!phone.value.match(pattern)) return
    try {
        const res = await captcha_sent(phone.value)
        console.log(res.data)
        sendDisable.value = true
        const timer = setInterval(() => {
            sendTime.value = sendTime.value - 1
            if (sendTime.value <= 0) {
                sendDisable.value = false
                sendTime.value = 60
                clearInterval(timer)
            }
        }, 1000);
    } catch (error) {
        console.log(error)
    }

}
const onSubmit = async (values: { phone: string, captcha: string }) => {
    try {
        const res = await captcha_verify(values.phone, values.captcha)
        if (res.data.data) {
            showNotify({ type: 'success', message: '登陆成功' });
            const userInfo = await getUserAccountInfo()
            if (userInfo.data.code === 200) {
                router.replace("/home")
            }
        }
    } catch (error) {
        showNotify({ type: 'warning', message: '验证码错误' });
    }
};

</script>

<template>
    <div class="login">
        <h1>手机登陆</h1>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="phone" type="number" name="phone" label="手机号" placeholder="手机号"
                    :rules="[{ pattern, required: true, message: '请填写正确的手机号' }]" autocomplete="off">

                </van-field>
                <div style="margin:10px 100px;">
                    <van-button @click="sendCaptcha" :disabled="sendDisable" round block type="primary"
                        native-type="button">
                        发送验证码{{ sendDisable? sendTime: '' }}
                    </van-button>
                </div>
                <van-field v-model="captcha" type="text" name="captcha" label="验证码" placeholder="验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>

    </div>
</template>

<style scoped lang="less">
.login {
    // height: 100vh;
    text-align: center;
    margin-top: 20vh;
    color: var(--primary-color);
}
</style>