<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref<boolean>(false)
const isPlay = ref<boolean>(true)
defineProps<{
    name: string
    songInfo: any
}>()

</script>

<template>
    <transition>
        <div>
            <!-- 最小化在页面底部显示 -->
            <div class="min" v-show="isShow">

            </div>
            <!-- 音乐播放界面组件 -->
            <div class="music-interface" v-show="!isShow">
                <header>
                    <div class="title">
                        <div class="min">
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
                    <van-image width="90%" radius="10px" fit="cover"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>

                    <div class="music-name">
                        <!-- 音乐名称 -->
                        {{ songInfo[0].name }}
                        <!-- <van-notice-bar background="rgba(0,0,0,.0)" color="#fff">
                            <template v-slot:default>
                                <div style=" font-size: 20px; text-align: center;">
                                    {{ songInfo[0].name }}
                                </div>
                            </template>
                        </van-notice-bar> -->
                    </div>
                    <div class="author">
                        作者
                    </div>
                </main>

                <footer>
                    <!-- 进度条 -->
                    <div class="progress-bar">
                        <div class="now">00:00</div>
                        <div class="bar">
                            <van-progress :percentage="10" stroke-width="3" color="#fff" track-color="#ccc"
                                :show-pivot="false" />
                        </div>
                        <div class="total">05:20</div>
                    </div>
                    <div class="control">
                        <div class="like">
                            <van-icon name="like-o" />
                        </div>
                        <div class="before">
                            <van-icon name="arrow-left" />
                        </div>
                        <div class="play" @click="isPlay = !isPlay">
                            <!-- ▶️点击播放,播放按钮,暂停的时候显示 -->
                            <van-icon name="play-circle-o" v-show="!isPlay" />
                            <!-- ⏸点击暂停,暂停按钮,播放的时候显示 -->
                            <van-icon name="pause-circle-o" v-show="isPlay" />
                        </div>
                        <div class="after">
                            <van-icon name="arrow" />
                        </div>
                        <div class="comment">
                            <van-icon name="comment-o" />
                        </div>
                    </div>
                </footer>

            </div>
        </div>

    </transition>

</template>

<style scoped lang="less">
.music-interface {
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    padding: 10px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: url("https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg") no-repeat center;
        background-size: auto 100vh;
        filter: blur(50px);
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
        // height: 40vh;
        margin: 30% auto;

        .music-name {
            width: 50%;
            text-align: center;
            padding: 10px 0;
        }
    }

    footer {


        .progress-bar {
            display: flex;
            align-items: center;
            padding: 10px;

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
            // margin: 20px;
            font-size: 30px;

            .play {
                font-size: 50px;
            }
        }
    }
}
</style>