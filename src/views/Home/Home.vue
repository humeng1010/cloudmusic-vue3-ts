<script setup lang="ts">
import Search from '@/views/Home/components/Search.vue'
import Banner from './components/Banner.vue'
import HomeNav from './components/HomeNav.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<template>
    <Suspense>

        <div class="home">

            <Search></Search>
            <Banner></Banner>
            <HomeNav></HomeNav>

        </div>
    </Suspense>

</template>

<style scoped lang="less">

</style>