<template>
  <n-grid cols="1 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen" style="width:100%;height: 100%;">
    <n-gi v-for="item in Lists">
      <n-space style="display: block;">
        <a style="width: 100%; text-decoration: none;" :href="item.url" target="_blank">
          <n-card style="height: 365px;" :title="item.name" shadow="hover"
                  :body-style="{ padding: '0 0 -5px 0' }" hoverable size="small">

            <n-avatar color="rgb(0,0,0,0.01)" :src="item.logo_url" :size="100" /><br />

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
import axios from 'axios';
import { NAvatar, NCard, NGi, NGrid, NSpace, } from 'naive-ui';
import { ref } from 'vue';
const Lists = ref([])
axios({
  method: 'get',
  url: 'https://mecdn.mcserverx.com/static/cfu/list.json'
}).then((res) => {

  Lists.value = res.data
  const jsonData = res.data;
  const linksr = ref([])
  linksr.value = jsonData.sort(() => Math.random() - 0.5);
})
console.log(Lists);


</script>