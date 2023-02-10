<script setup lang="ts">
import { ref, watchEffect, computed, watch } from 'vue'
import { getSongUrl } from '@/api/index'
import { showToast } from 'vant'

// 是否显示完整的播放界面
const isShow = ref<boolean>(false)
// 播放状态
const isPlay = ref<boolean>(true)
// 当前播放的歌曲索引
const songIndex = ref(0)
/**
 * name : 当前所处的播放位置(私人FM,每日推荐,排行榜...)
 * songInfo : 歌曲列表
 */
const props = defineProps<{
    name: string
    songInfo: any[]
}>()

// 获取播放歌曲的url,并存放在每一个songInfo的songUrl中
props.songInfo.forEach(async (ele: any) => {
    const res = await getSongUrl(ele.id, "hires")
    ele.songUrl = res.data.data[0]
});
console.log(props.songInfo)

// 应该等待audio加载完毕再进行计时等操作防止网络原因导致出现bug (接下来需要完善的)
// 控制音乐,获取audio的ref,方便操作
const audio = ref<HTMLAudioElement>()
watchEffect(() => {
    if (isPlay.value) {
        audio.value?.play().catch((reason) => {
            console.log(reason)
            isPlay.value = false
            showToast('请手动播放')
        })
    } else {
        audio.value?.pause()
    }
})
const totalS = Math.round(props.songInfo[songIndex.value].duration / 1000)
// 该歌曲的总时间
const totalTime = computed(() => {
    // 歌曲总时间-单位秒
    const s = totalS
    const ss = s % 60
    const sss = ss < 10 ? '0' + ss : ss
    // 分钟
    const mm = Math.floor(s / 60)
    const mmm = mm < 10 ? '0' + mm : mm

    return mmm + ':' + sss
})
// 进度条
const progressBar = ref(0)
const time = ref({ m: 0, s: 0 })
// 秒-(用于计算进度条的数值和判断当前时间是否等于总时间)
let m = 0
// 定时器
let timer: number | undefined
watch(isPlay, () => {
    if (isPlay.value) {
        timer = setInterval(() => {
            if (time.value.s >= 59) {
                time.value.m++
                time.value.s = 0
                // 进度条
                m++
                let progress = (m / parseInt((props.songInfo[songIndex.value].duration / 1000).toFixed(0))) * 100
                if (progress > 100) return
                progressBar.value = progress
                return
            }
            // 如果当前时间大于总时间
            if ((time.value.m * 60 + time.value.s) >= parseInt((props.songInfo[songIndex.value].duration / 1000).toFixed(0))) {
                clearInterval(timer)
                isPlay.value = false
                return
            }
            time.value.s++
            // 进度条
            m++
            let progress = (m / parseInt((props.songInfo[songIndex.value].duration / 1000).toFixed(0))) * 100
            if (progress > 100) return
            progressBar.value = progress

            if (m >= totalS) {
                playAfter()
            }
        }, 1000)
    } else {
        clearInterval(timer)
    }
}, { immediate: true })
// 用于展示的当前时间的格式
const nowTime = computed(() => {
    return (time.value.m < 10 ? '0' + time.value.m : time.value.m) + ':' + (time.value.s < 10 ? '0' + time.value.s : time.value.s)
})
// 重置状态
const resetState = () => {
    // 重置当前时间
    time.value.m = 0
    time.value.s = 0
    // 重置进度条的m
    m = 0
    // 重置进度条
    progressBar.value = 0
    // 恢复播放
    isPlay.value = true
}
// 上一首
const playBefore = () => {
    if (songIndex.value === 0) {
        showToast('前面没有歌曲');
        return
    }
    songIndex.value--
    resetState()
}
const playAfter = () => {
    // 推荐的歌曲列表小于等于歌曲索引则需要再次请求 推荐列表
    if (props.songInfo.length - 1 <= songIndex.value) {
        console.log('request')

        showToast('后面没有歌曲,需要再次请求,获取私人FM');
        return
    }
    songIndex.value++
    resetState()
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
                    {{ name?name: '音乐播放器' }}
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