<script setup lang="ts">
import MusicInterface from '@/components/common/MusicInterface.vue'
import { get_personal_fm } from '@/api/index'
import { ref } from 'vue';
// 音乐信息
const songInfo = ref()

const getPersonalFM = async () => {
    const res = await get_personal_fm()
    songInfo.value = res.data.data
}
await getPersonalFM()


</script>

<template>
    <MusicInterface name="私人FM" :songInfo="songInfo" @getPersonalFM="getPersonalFM"></MusicInterface>
</template>

<style scoped lang="less">

</style>