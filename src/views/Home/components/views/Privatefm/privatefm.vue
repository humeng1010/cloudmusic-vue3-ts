<script setup lang="ts">
import MusicInterface from '@/components/common/MusicInterface.vue'

import { useSongStores } from '@/stores/song'

const songStores = useSongStores()
await songStores.getSong()
const songInfo = songStores.songInfo

</script>

<template>
    <MusicInterface name="私人FM" :songInfo="songInfo"></MusicInterface>
</template>

<style scoped lang="less">

</style>