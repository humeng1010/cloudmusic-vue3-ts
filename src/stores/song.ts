import { defineStore } from 'pinia'
import { ref } from 'vue'
import { get_personal_fm, getSongUrl } from '@/api/index'

export const useSongStores = defineStore('songInfo', () => {
    // 音乐信息
    const songInfo = ref()
    // 获取音乐信息
    const getSong = async () => {
        const res = await get_personal_fm()
        songInfo.value = res.data.data

        songInfo.value.forEach(async (ele: any) => {
            const res = await getSongUrl(ele.id, "hires")
            ele.songUrl = res.data.data[0]
        });
    }

    return {
        songInfo,
        getSong
    }
})