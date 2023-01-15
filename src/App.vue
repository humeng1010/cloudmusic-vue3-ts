<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <RouterView #default="{ Component }">
      <!-- 路由切换的时候保留home首页. include中写的是组件的name属性 -->
      <keep-alive :include="['Home']">
        <component :is='Component'></component>
      </keep-alive>
    </RouterView>
  </Suspense>
</template>

<style scoped>

</style>
