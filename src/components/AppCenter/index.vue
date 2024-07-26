<template>
  <n-modal
      v-model:show="showAddApp"
      :mask-closable="false"
      preset="card"
      style="width: 600px"
      title="新建应用">
    <addApp></addApp>
  </n-modal>
  <n-modal
      v-model:show="showUpdateApp"
      :mask-closable="false"
      preset="card"
      style="width: 600px"
      title="修改应用">
    <updateApp :id="updateId"></updateApp>
  </n-modal>
  <n-space vertical>
    <n-space>
      <n-button type="primary" @click="getApplist">刷新</n-button>
      <n-button type="primary" @click="showAddApp = true">新增应用</n-button>
    </n-space>
    <br/>
    <n-table striped>
      <thead>
      <tr>
        <th>应用 ID</th>
        <th>应用名</th>
        <th>应用描述</th>
        <th>AppId</th>
        <th>AppSecret</th>
        <th>创建时间</th>
        <th>更新时间</th>
        <th>应用状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in appList">
        <td>{{i.id}}</td>
        <td>{{i.appName}}</td>
        <td>{{i.appDescription}}</td>
        <td>{{i.appId}}</td>
        <td>
          <div v-if="DontShowAppSecret[i.id]">
            <n-tag type="info" @click="changeShowAppSecret($event, i.appSecret, i.id)">
              点击显示
            </n-tag>
          </div>
          <template v-else>
            <n-tag type="info">
              {{ i.appSecret }}
            </n-tag>
          </template></td>
        <td>{{i.createdAt}}</td>
        <td>{{i.updatedAt}}</td>
        <td v-if="i.status === '正常'"><n-tag type="success">{{ i.status }}</n-tag></td>
        <td v-else><n-tag type="error">{{ i.status }}</n-tag></td>
        <td>
          <n-space>
            <n-button type="info" @click="updateId = i.id;showUpdateApp = true">更新</n-button>
            <n-button type="error" @click="deleteApp(i.id)">删除</n-button>
        </n-space>
        </td>
      </tr>
      </tbody>
    </n-table>
  </n-space>
</template>
<script setup>
import { ref } from "vue";
import addApp from "./addApp.vue";
import {sendErrorMessage, sendSuccessMessage} from "@utils/message.js";
import { get, Delete } from "@utils/request/axios.js";
import clipboard from "@utils/clipboard.js";
import store from "@utils/stores/profile.js";
import { useDialog } from "naive-ui";
import updateApp from "./updateApp.vue";

const updateId = ref("");
const dialog = useDialog();
const DontShowAppSecret = ref([]);
const showAddApp = ref(false);
const showUpdateApp = ref(false);
const appList = ref([]);

async function getApplist() {
  const info = {
    "username": store.getters.get_username
  }
  const rs = await get("/v1/app/list", info);
  if (rs.status === 200) {
    if (rs.data.list.length === 0) {
      return;
    }
    appList.value = rs.data.list;
    appList.value.forEach((item) => {
      let i = appList.value.indexOf(item);
      if (item.status === "0") {
        appList.value[i].status = "正常";
        DontShowAppSecret.value[item.id] = true
      } else {
        appList.value[i].status = "异常";
        DontShowAppSecret.value[item.id] = true
      }
    })
  } else {
    sendErrorMessage("列表获取失败");
  }
}

async function deleteApp(id){
  const info = {
    "username": store.getters.get_username,
    "id": id
  };

  dialog.warning({
    title: "警告",
    content: "你真的要删除该应用吗?",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: async () => {
      const rs = await Delete("/v1/app/delete", info)
      if (rs.status === 200) {
        sendSuccessMessage("删除成功");
        getApplist();
      } else {
        sendErrorMessage("删除失败: " + rs.data.msg)
      }
    },
  });
}

async function changeShowAppSecret(event, appSecret, id){
  DontShowAppSecret.value[id] = !DontShowAppSecret.value[id]
  clipboard(appSecret, event)
  setTimeout(() => {
    DontShowAppSecret.value[id] = !DontShowAppSecret.value[id]
  }, 3000)
}
getApplist();
</script>