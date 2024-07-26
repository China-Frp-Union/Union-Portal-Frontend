<template>
  <n-modal
      v-model:show="showUpdateSite"
      :mask-closable="false"
      preset="card"
      style="width: 600px"
      title="添加黑名单">
    <updateSite :id="updateId"></updateSite>
  </n-modal>
  <n-space vertical>
    <n-button type="primary" @click="getSiteList()">刷新</n-button>
    <br/>
    <n-table striped>
      <thead>
      <tr>
        <th>申请 ID</th>
        <th>站点名</th>
        <th>描述</th>
        <th>站点 URL</th>
        <th>LOGO URL</th>
        <th>识别码</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in siteList">
        <td>{{i.id}}</td>
        <td>{{i.name}}</td>
        <td>{{i.description}}</td>
        <td>{{i.url}}</td>
        <td>{{i.logoUrl}}</td>
        <td>{{i.code}}</td>
        <td>
          <n-space>
            <n-button type="info" @click="updateId = i.id;showUpdateSite=true" :disabled="!canEdit[i.id]">更新</n-button>
            <n-button type="error" @click="deleteSite(i.id)" :disabled="!canDelete[i.id]">删除</n-button>
          </n-space>
        </td>
      </tr>
      </tbody>
    </n-table>
  </n-space>
</template>

<script setup>
import { Delete, get } from "@utils/request/axios.js";
import { ref } from "vue";
import { sendErrorMessage, sendSuccessMessage } from "@utils/message.js";
import store from "@utils/stores/profile.js";
import { useDialog } from "naive-ui";
import updateSite from "./updateSite.vue";

const canEdit = ref([]);
const canDelete = ref([]);
const updateId = ref("");
const showUpdateSite = ref(false);
const dialog = useDialog();
const siteList = ref([
  {
    "code": "",
    "name": "",
    "manager": "",
    "description": "",
    "id": 0,
    "logoUrl": "",
    "url": "",
  }
])
async function getSiteList() {
  const rs = await get("/v1/list/get");
  const permission = Number(store.getters.get_permission);
  if (rs.status === 200) {
    siteList.value = rs.data.list;
    siteList.value.forEach((item) => {
      // 获取索引
      let i = item.id;
      canEdit.value[i] = item.manager === store.getters.get_username || permission > 1;
      canDelete.value[i] = permission > 1;
    })
    console.log(canEdit);
  } else {
    sendErrorMessage("列表获取失败");
  }
}
// 可编辑：permission>2 或 manager
// 可删除： permission>2
// const permission = Number(store.getters.get_permission);
// let canEdit = (permission > 2 || manager === 1);
// let canDelete = (permission > 2);


async function deleteSite(id){
  const info = {
    "username": store.getters.get_username,
    "id": id
  };
  dialog.warning({
    title: "提示",
    content: "是否删除?",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: async () => {
      const rs = await Delete("/v1/site/delete", info);
      if (rs.status === 200) {
        sendSuccessMessage("删除成功");
        await getSiteList();
      } else {
        sendErrorMessage("删除失败: " + rs.data.msg)
      }
    },
  });
}


getSiteList();
</script>