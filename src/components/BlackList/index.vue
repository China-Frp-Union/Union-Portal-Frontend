<template>
  <n-modal
      v-model:show="showAddBlackListElement"
      :mask-closable="false"
      preset="card"
      style="width: 600px"
      title="添加黑名单">
      <addBlackListElement></addBlackListElement>
  </n-modal>
  <n-modal
      v-model:show="showUpdateBlackListElement"
      :mask-closable="false"
      preset="card"
      style="width: 600px"
      title="修改黑名单">
    <updateBlackListElement :id="updateId"></updateBlackListElement>
  </n-modal>
  <n-space vertical>
    <n-space>
      <n-button type="primary" @click="getBlacklist()">刷新</n-button>
      <n-button type="primary" @click="showAddBlackListElement = true">新增黑名单</n-button>
      <n-input v-model:value="searchByEmail" placeholder="输入邮箱"></n-input>
      <n-button type="primary" @click="getBlackListByEmail()">搜索</n-button>
    </n-space>
    <br/>
    <n-table striped>
      <thead>
      <tr>
        <th>封禁 ID</th>
        <th>所属应用AppId</th>
        <th>邮箱</th>
        <th>原因</th>
        <th>创建时间</th>
        <th>更新时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in blacklist">
        <td>{{i.id}}</td>
        <td>{{i.appId}}</td>
        <td v-if="i.email.indexOf(';') !== -1"><n-tag style="margin-right: 10px" type="success" v-for="b in i.email.split(';')">
          {{ b }}
        </n-tag></td>
        <td v-else><n-tag type="success">
          {{ i.email }}
        </n-tag></td>
        <td>{{i.reason}}</td>
        <td>{{i.createdAt}}</td>
        <td>{{i.updatedAt}}</td>
        <td><n-space>
          <n-button type="info" @click="updateId = i.id;showUpdateBlackListElement = true">更新</n-button>
          <n-button type="error" @click="deleteBlackList(i.id)">删除</n-button>
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
import addBlackListElement from "./addBlackListElement.vue";
import updateBlackListElement from "./updateBlackListElement.vue";
import store from "@utils/stores/profile.js";
import { useDialog } from "naive-ui";

const updateId = ref("");
const searchByEmail = ref("");
const dialog = useDialog();
const showUpdateBlackListElement = ref(false);
const showAddBlackListElement = ref(false);
const blacklist = ref([
  {
    "id": 0,
    "reason": "",
    "email": "",
    "appId": "",
    "createdAt": "",
    "updatedAt": "",
  }
])

async function getBlacklist() {
  const rs = await get("/v1/blacklist/list/all");
  if (rs.status === 200) {
    blacklist.value = rs.data.list;
    console.log(blacklist.value);
  } else {
    sendErrorMessage("列表获取失败");
  }
}

async function getBlackListByEmail(){
  if (searchByEmail.value === ""){
    await getBlacklist();
  }
  const info = {
    "email": searchByEmail.value
  };
  const rs = await get("/v1/blacklist/list/email", info);
  if (rs.status === 200) {
    blacklist.value = rs.data.list;
  } else {
    sendErrorMessage("列表获取失败");
  }
}

async function deleteBlackList(id){
  const info = {
    "username": store.getters.get_username,
    "id": id
  };

  dialog.warning({
    title: "警告",
    content: "你真的要删除该记录吗?",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: async () => {
      const rs = await Delete("/v1/blacklist/delete/web", info)
      if (rs.status === 200) {
        sendSuccessMessage("删除成功");
        getBlacklist();
      } else {
        sendErrorMessage("删除失败: " + rs.data.msg)
      }
    },
  });
}

getBlacklist();
</script>