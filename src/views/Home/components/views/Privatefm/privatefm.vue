<script setup lang="ts">
import MusicInterface from '@/components/common/MusicInterface.vue'
import { get_personal_fm, getSongUrl } from '@/api/index'
import { ref } from 'vue';
// 音乐信息
const songInfo = ref()
// 获取私人音乐 会获取到一个数组,数组中包含3首推荐的音乐,然后根据音乐id获取音乐url信息,保存到songInfo的songUrl属性
const res = await get_personal_fm()
songInfo.value = res.data.data
songInfo.value.forEach((ele: any) => {
    getSongUrl(ele.id, "hires").then((res: any) => {
        // console.log(res)
        ele.songUrl = res.data.data[0]
        // console.log(ele)
    })
});



</script>

<template>
    <!-- 歌曲名称:{{ songInfo[0].name }} -->
    <!-- <audio :src="songUrl[0]" controls autoplay></audio> -->
    <MusicInterface name="私人FM" :songInfo="songInfo"></MusicInterface>
</template>

<style scoped lang="less">

</style>