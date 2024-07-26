<template>
  <n-space vertical>
    <br/>
    <n-table striped>
      <thead>
      <tr>
        <th>申请 ID</th>
        <th>站点名</th>
        <th>描述</th>
        <th>站点 URL</th>
        <th>LOGO URL</th>
        <th>联系方式</th>
        <th>申请时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in applicationList">
        <td>{{i.id}}</td>
        <td>{{i.name}}</td>
        <td>{{i.description}}</td>
        <td>{{i.url}}</td>
        <td>{{i.logoUrl}}</td>
        <td>{{i.contact}}</td>
        <td>{{i.time}}</td>
        <td><n-space>
          <n-button type="success" @click="acceptApplication(i.id)">同意</n-button>
          <n-button type="error" @click="refuseApplication(i.id)">拒绝</n-button>
        </n-space></td>
      </tr>
      </tbody>
    </n-table>
  </n-space>
</template>

<script setup>
import {Delete, get} from "@utils/request/axios.js";
import { ref } from "vue";
import {sendErrorMessage, sendSuccessMessage} from "@utils/message.js";
import store from "@utils/stores/profile.js";
import { useDialog } from "naive-ui";

const dialog = useDialog();
const applicationList = ref([
  {
    "contact": "",
    "name": "",
    "description": "",
    "id": 9,
    "time": "",
    "logoUrl": "",
    "url": "",
    "email": ""
  }
])

async function getApplicationList() {
  const info = {
    "username": store.getters.get_username,
  };
  const rs = await get("/v1/application/list", info);
  if (rs.status === 200) {
    applicationList.value = rs.data.list;
    console.log(applicationList.value);
  } else {
    sendErrorMessage("列表获取失败");
  }
}

async function acceptApplication(id){
  const info = {
    "username": store.getters.get_username,
    "id": id
  };

  dialog.info({
    title: "提示",
    content: "是否同意?",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: async () => {
      const rs = await get("/v1/application/accept", info)
      if (rs.status === 200) {
        sendSuccessMessage("已同意");
        await getApplicationList();
      } else {
        sendErrorMessage("请求失败: " + rs.data.msg)
      }
    },
  });
}

async function refuseApplication(id){
  const info = {
    "username": store.getters.get_username,
    "id": id
  };

  dialog.info({
    title: "提示",
    content: "是否拒绝?",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: async () => {
      const rs = await get("/v1/application/refuse", info)
      if (rs.status === 200) {
        sendSuccessMessage("已拒绝");
        await getApplicationList();
      } else {
        sendErrorMessage("请求失败: " + rs.data.msg)
      }
    },
  });
}

getApplicationList();
</script>