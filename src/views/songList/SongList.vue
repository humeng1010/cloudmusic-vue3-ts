<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { searchKeyword, getSongUrl } from '../../api/index'
const route = useRoute()
const searchResult = ref()
const res = await searchKeyword(route.query.keyword as string)
searchResult.value = res.data.result.songs
const songUrl = ref()
const playSong = async (id: string) => {
    console.log(id)
    const res = await getSongUrl(id)
    console.log(res)
    songUrl.value = res.data.data[0].url
    console.log(songUrl.value)
}

</script>

<template>
    歌曲列表:{{ $route.query.keyword }}
    <audio :src="songUrl" autoplay controls></audio>
    <ul>
        <li v-for="song in searchResult" :key="song.id" @click="playSong(song.id)">
            {{ song.name }}
        <li v-for="artist in song.artists" :key="artist.id">
            {{ artist.name }}
        </li>
        <hr>
        </li>
    </ul>
</template>

<style scoped lang="less">

</style>