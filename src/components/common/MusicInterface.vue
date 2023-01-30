<script setup lang="ts">
import { ref, watchEffect, computed, watch } from 'vue'
import { getSongUrl } from '@/api/index'
import { showToast } from 'vant'

const isShow = ref<boolean>(false)
const isPlay = ref<boolean>(true)
const songIndex = ref(0)
const props = defineProps<{
    name: string
    songInfo: any[]
}>()
const emit = defineEmits<{
    (e: 'getPersonalFM'): Promise<void>
}>()
props.songInfo.forEach(async (ele: any) => {
    const res = await getSongUrl(ele.id, "hires")
    ele.songUrl = res.data.data[0]
});
console.log(props.songInfo)
// 控制音乐
const audio = ref<HTMLAudioElement>()
watchEffect(() => {
    if (isPlay.value) {
        // console.log("play")
        audio.value?.play().catch((reason) => {
            console.log(reason)
            isPlay.value = false
            showToast('请手动播放')
        })
    } else {
        // console.log('pause')
        audio.value?.pause()
    }
})
const totalTime = computed(() => {
    const s = (props.songInfo[songIndex.value].duration / 1000).toFixed(0)
    const ss = parseInt(s) % 60
    const sss = ss < 10 ? '0' + ss : ss
    const mm = (parseInt(s) / 60).toFixed(0)
    const mmm = parseInt(mm) < 10 ? '0' + mm : mm

    return mmm + ':' + sss
})
// 进度条
const progressBar = ref(0)
const time = ref({ m: 0, s: 0 })
// 秒
let m = 0
watch(time.value, () => {
    m++
    let progress = (m / parseInt((props.songInfo[songIndex.value].duration / 1000).toFixed(0))) * 100
    if (progress > 100) return
    progressBar.value = progress
    // console.log('@', progressBar.value)
})

let timer: number | undefined
watch(isPlay, () => {
    if (isPlay.value) {
        timer = setInterval(() => {
            if (time.value.s >= 59) {
                time.value.m++
                time.value.s = 0
                return
            }
            // 如果当前时间大于总时间
            if ((time.value.m * 60 + time.value.s) >= parseInt((props.songInfo[songIndex.value].duration / 1000).toFixed(0))) {
                clearInterval(timer)
                isPlay.value = false
                return
            }
            time.value.s++
        }, 1000)
    } else {
        clearInterval(timer)
    }
}, { immediate: true })
const nowTime = computed(() => {
    return (time.value.m < 10 ? '0' + time.value.m : time.value.m) + ':' + (time.value.s < 10 ? '0' + time.value.s : time.value.s)
})
const playBefore = () => {
    if (songIndex.value === 0) {
        showToast('前面没有歌曲');
        return
    }
    songIndex.value--
    time.value.m = 0
    time.value.s = 0
    m = 0
    progressBar.value = 0
    isPlay.value = true


}
const playAfter = async () => {
    // 推荐的歌曲列表小于等于歌曲索引则需要再次请求 推荐列表
    if (props.songInfo.length - 1 <= songIndex.value) {
        console.log('request')

        showToast('后面没有歌曲,需要再次请求,获取私人FM');
        emit('getPersonalFM')
        // return
    }
    songIndex.value++
    time.value.m = 0
    time.value.s = 0
    m = 0
    progressBar.value = 0
    isPlay.value = true

}



</script>

<template>
    <!-- 最小化在页面底部显示 -->
    <div class="min" v-show="isShow">
        <span @click="isShow = false">再次点击我打开(待开发)</span>
    </div>
    <!-- 音乐播放界面组件 -->
    <div class="music-interface" v-show="!isShow">
        <header>
            <div class="title">
                <div class="min" @click="isShow = true">
                    <van-icon name="arrow-down" />
                </div>
                <div class="name">
                    {{ name }}
                </div>
                <div class="more">
                    <van-icon name="ellipsis" />
                </div>
            </div>
        </header>

        <main class="main">
            <!-- pic -->
            <van-image :src="songInfo[songIndex].album.picUrl" width="90%" radius="10px" fit="cover">
                <!-- <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template> -->
            </van-image>

            <div class="music-name">
                <!-- 音乐名称 -->
                {{ songInfo[songIndex].name }}
                <!-- 名称过长优化 -->
                <!-- <van-notice-bar background="rgba(0,0,0,.0)" color="#fff">
                            <template v-slot:default>
                                <div style=" font-size: 20px; text-align: center;">
                                    {{ songInfo[0].name }}
                                </div>
                            </template>
                        </van-notice-bar> -->
            </div>
            <div class="author">
                <span class="van-ellipsis" v-for="artist in songInfo[songIndex].album.artists">
                    {{ artist.name }} &nbsp;
                </span>
                <!-- 作者名称过长优化 -->
                <!-- <van-notice-bar background="rgba(0,0,0,.0)" color="#fff">
                    <template v-slot:default>
                        <div style=" font-size: 20px; text-align: center;">
                            <span v-for="artist in songInfo[0].album.artists">
                                {{ artist.name }}&nbsp;
                            </span>
                        </div>
                    </template>
                </van-notice-bar> -->
            </div>
        </main>

        <footer>
            <!-- 进度条 -->
            <div class="progress-bar">
                <div class="now">
                    {{ nowTime }}
                </div>
                <div class="bar">
                    <van-progress :percentage="progressBar" stroke-width="3" color="#fff" track-color="#ccc"
                        :show-pivot="false" />
                </div>
                <div class="total">
                    {{ totalTime }}
                </div>
            </div>

            <div class="control">
                <div class="like">
                    <van-icon name="like-o" />
                </div>
                <div class="before" @click="playBefore">
                    <van-icon name="arrow-left" />
                </div>
                <audio :src="songInfo[songIndex].songUrl?.url" autoplay ref="audio"></audio>
                <div class="play" @click="isPlay = !isPlay">
                    <!-- ▶️点击播放,播放按钮,暂停的时候显示 -->
                    <van-icon name="play-circle-o" v-show="!isPlay" />
                    <!-- ⏸点击暂停,暂停按钮,播放的时候显示 -->
                    <van-icon name="pause-circle-o" v-show="isPlay" />
                </div>
                <div class="after" @click="playAfter">
                    <van-icon name="arrow" />
                </div>
                <div class="comment">
                    <van-icon name="comment-o" />
                </div>
            </div>
        </footer>

    </div>


</template>

<style scoped lang="less">
.music-interface {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90vh;
    padding: 5vh 10px;
    color: #fff;
    text-shadow: .5px .5px #000;
    font-size: 20px;
    font-weight: 300;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: v-bind('"url(" + songInfo[songIndex].album.blurPicUrl + ")"') no-repeat center;
        background-size: 100vw 100vh;
        filter: blur(30px);
        z-index: -1;
    }

    .title {
        display: flex;
        justify-content: space-between;
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        .music-name {
            padding: 18px 0;
        }

        .author {
            width: 60vw;
            overflow: hidden;
            text-align: center;
        }
    }

    footer {


        .progress-bar {
            display: flex;
            align-items: center;
            padding: 10px;

            .now {
                width: 60px;
                text-align: center;
            }

            .bar {
                flex: 1;
                padding: 10px;
            }
        }

        .control {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 0 20px;
            font-size: 30px;

            .play {
                font-size: 50px;
            }
        }
    }
}
</style>