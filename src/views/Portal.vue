<template>
  <n-layout v-if="!isLoginRoute" style="height: 100vh" :nativeScrollbar="false">
    <n-layout-header style="height: 6rem">
      <Header></Header>
    </n-layout-header>
    <n-layout-content :native-scrollbar="false">
      <n-layout content-style="padding: 24px;">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in" :duration="400">
            <div :key="router.currentRoute.value.name">
              <component :is="Component" />
            </div>
          </Transition>
        </router-view>
      </n-layout>
    </n-layout-content>
    <n-layout-footer>
      <n-flex style="padding: 24px;" vertical>
        <n-p>本网站由以下站点用❤驱动</n-p>
        <n-li>
          <n-a href="https://wolfyang.fan" style="text-decoration: none;" target="_blank">弱受小狼在线接单</n-a>
        </n-li>
        <n-li>
          <n-a href="https://www.xiexilin.com" style="text-decoration: none;" target="_blank">XieXiLin 的小站</n-a>
        </n-li>
        <n-li>
          <n-a href="https://www.daiyangcheng.cn" style="text-decoration: none;" target="_blank">Daiyangcheng‘s
            Blog</n-a>
        </n-li>
        <n-li>
          <n-a href="https://blog.utf-8.fun" style="text-decoration: none;" target="_blank">FOXBALL-ONE的窝</n-a>
        </n-li>
        <n-li>
          <n-a href="https://paypal.me/AehxyCN" style="text-decoration: none;" target="_blank">Aehxy 的个人小站</n-a>
        </n-li>
        <n-li>
          <n-a href="https://milu.ink" style="text-decoration: none;" target="_blank">米露小窝</n-a>
        </n-li>
      </n-flex>
    </n-layout-footer>
  </n-layout>
  <router-view v-else v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import router from "@src/router";
import Header from "./Layout/Header.vue";

const route = useRoute();

const isLoginRoute = computed(() => {
  return route.name === "login"; // Adjust 'login' to your actual login route name
});
</script>
