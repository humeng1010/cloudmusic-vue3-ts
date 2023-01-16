<script setup lang="ts">
import { getDragonBall } from '@/api/index'
import { ref } from 'vue';
const lists = ref([])
const data = await getDragonBall()
console.log(data.data)
lists.value = data.data.data

</script>

<template>
    <div class="row">
        <div class="nav-row">
            <div class="list" v-for="list in lists" :key="list.id">
                <!-- <div class="icon"></div> -->
                <img :src="list.iconUrl" alt="">
                <div class="title">{{ list.name }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.row {
    width: 100%;
    overflow-x: auto;

    .nav-row {
        display: flex;
        width: 200%;

        .list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 10%;

            margin: 10px 0;

            img {
                width: 100%;
                filter: drop-shadow(-80px 0px red);
                transform: translateX(80px);
            }

        }
    }
}
</style>