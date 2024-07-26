<template>
    <n-layout v-if="!isLoginRoute" style="height: 100vh">
      <n-layout-header style="height: 64px" bordered>
        <Header />
      </n-layout-header>
      <n-layout position="absolute" style="top: 64px;">
        <n-layout content-style="padding: 24px;" :native-scrollbar="false">
          <router-view v-slot="{ Component }">
            <Transition name="fade" mode="out-in" :duration="400">
              <div :key="router.currentRoute.value.name">
                <component :is="Component" />
              </div>
            </Transition>
          </router-view>
        </n-layout>
      </n-layout>
    </n-layout>
    <router-view v-else v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import router from "@src/router";
import Header from "./Layout/Header.vue";


const route = useRoute();

const isLoginRoute = computed(() => {
  return route.name === 'login'; // Adjust 'login' to your actual login route name
});
</script>