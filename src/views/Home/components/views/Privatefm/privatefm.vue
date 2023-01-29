<script setup lang="ts">
import MusicInterface from '@/components/common/MusicInterface.vue'
import { get_personal_fm, getSongUrl } from '@/api/index'
import { ref } from 'vue';
// 音乐信息
const songInfo = ref()
// 获取私人音乐 会获取到一个数组,数组中包含3首推荐的音乐,然后根据音乐id获取音乐url信息,保存到songInfo的songUrl属性
const res = await get_personal_fm()
songInfo.value = res.data.data
// 有bug
/* songInfo.value.forEach(async (ele: any) => {
    const res = await getSongUrl(ele.id, "hires")
    ele.songUrl = res.data.data[0]
}); */



</script>

<template>
    <MusicInterface name="私人FM" :songInfo="songInfo"></MusicInterface>
</template>

<style scoped lang="less">

</style>