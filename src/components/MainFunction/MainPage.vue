<template>
  <div v-if="loading"
    style="width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
    <n-spin size="medium" />
    <p style="margin: auto; margin-top: 15px;">Loading......</p>
  </div>
  <div v-if="!loading && !success">
    <p>获取数据失败，可能是网络开小差了~</p>
  </div>
  <n-grid cols="1 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen" style="width:100%;height: 100%;">
    <n-gi v-if="!loading && success" v-for="item in lists">
      <n-space style="display: block;">
        <a style="width: 100%; text-decoration: none;" :href="item.url" target="_blank">
          <n-card style="height: 365px;" :title="item.name" shadow="hover" :body-style="{ padding: '0 0 -5px 0' }"
            hoverable size="small">

            <n-avatar color="rgb(0,0,0,0.01)" :src="item.logoUrl" :size="100" /><br />

            {{ item.description }}

            <template #footer>
              官网地址： <br /> {{ item.url }}
            </template>
            <template #action>
              CFU识别码: {{ item.code }}
            </template>

          </n-card>
        </a>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@utils/request/axios.js";

var loading = ref(true);
var success = ref(false);

const lists = ref([])
async function getList() {
  const rs = await get("/v1/list/get");
  if (rs.status === 200) {
    lists.value = rs.data.list.sort(() => Math.random() - 0.5);
    success.value = true;
  }
  loading.value = false;
}

getList();

</script>