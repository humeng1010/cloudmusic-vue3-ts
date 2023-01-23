<script setup lang="ts">
import { get_personal_fm, getSongUrl } from '@/api/index'
import { ref } from 'vue';
const songInfo = ref()
const res = await get_personal_fm()
const songUrl = ref([])
songInfo.value = res.data.data
songInfo.value.forEach((ele: any) => {
    console.log(ele)
    getSongUrl(ele.id, "hires").then((res: any) => {
        console.log(res)
        songUrl.value.push(res.data.data[0].url)
    })
});



</script>

<template>
    私人fm
    歌曲名称:{{ songInfo[0].name }}
    <audio :src="songUrl[0]" controls autoplay></audio>
</template>

<style scoped lang="less">

</style>