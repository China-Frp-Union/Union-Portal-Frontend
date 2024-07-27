<template>
  <n-form inline :label-width="80" :model="formValue" :size="'medium'">
    <n-grid cols="1" :y-gap="3">
      <n-form-item-gi span="1" label="选择关联的应用" path="appId">
        <n-select v-model:value="formValue.appId" placeholder="选择关联的应用" :options="appList" />
      </n-form-item-gi>
      <n-form-item-gi span="1" label="邮箱 (多个用 ; 分隔)" path="email">
        <n-input v-model:value="formValue.email" placeholder="输入邮箱" />
      </n-form-item-gi>
      <n-form-item-gi span="1" label="原因" path="reason">
        <n-input v-model:value="formValue.reason" placeholder="输入原因" />
      </n-form-item-gi>
      <n-form-item-gi span="1">
        <n-button attr-type="button" type="primary" @click="submit()">
          添加
        </n-button>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { get, post } from "@utils/request/axios.js";
import store from "../../utils/stores/profile.js";
import { sendErrorMessage } from "@utils/message.js";
import { SendSuccessDialog } from "@utils/dialog.js";
import { FinishLoadingBar, StartLoadingBar } from "@utils/loadingbar.js";

const formValue = ref({
  "username": store.getters.get_username,
  "appId": "",
  "email": "",
  "reason": ""
})

const emit = defineEmits(["addSuccess"])

const appList = ref([])

async function getAppList() {
  StartLoadingBar();
  const info = {
    "username": store.getters.get_username
  };
  const rs = await get("/v1/app/list", info)
  if (rs.status === 200) {
    let i = 0;
    if (rs.data.list.length === 0) {
      sendErrorMessage("还未添加任何应用!");
      return;
    }
    rs.data.list.forEach(item => {
      appList.value[i] = {
        "label": "",
        "value": ""
      };
      appList.value[i].label = item.appName + " [" + item.appId + "]";
      appList.value[i].value = item.appId;
      i++
    })
  }
  FinishLoadingBar();
}

async function submit() {
  StartLoadingBar();
  const info = formValue.value;
  const rs = await post("/v1/blacklist/create/web", info);
  if (rs.status === 200) {
    SendSuccessDialog("添加成功");
    emit("addSuccess");
  } else {
    SendErrorDialog("添加失败, 错误信息: " + rs.status + rs.data.msg)
  }
  FinishLoadingBar();
}

getAppList()
</script>
