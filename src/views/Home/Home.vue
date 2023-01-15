<script setup lang="ts">
import Search from '@/views/Home/components/Search.vue'
import Banner from './components/Banner.vue'

</script>

<template>
    <Suspense>

        <div class="home">

            <Search></Search>
            <Banner></Banner>
        </div>
    </Suspense>

</template>

<style scoped lang="less">

</style>