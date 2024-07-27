<template>
  <n-form inline :label-width="80" :model="formValue" :size="'medium'">
    <n-grid cols="1" :y-gap="3">
      <n-form-item-gi span="1" label="应用名" path="email">
        <n-input v-model:value="formValue.appName" placeholder="输入应用名" />
      </n-form-item-gi>
      <n-form-item-gi span="1" label="应用描述" path="reason">
        <n-input v-model:value="formValue.appDescription" placeholder="输入应用描述" />
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
import { ref } from "vue";
import { post } from "@utils/request/axios.js";
import store from "@utils/stores/profile.js";
import { SendSuccessDialog, SendErrorDialog } from "@utils/dialog.js";
import { FinishLoadingBar, StartLoadingBar } from "@utils/loadingbar.js";

const formValue = ref({
  "username": store.getters.get_username,
  "appName": "",
  "appDescription": "",
})


async function submit() {
  StartLoadingBar();
  const info = formValue.value;
  const rs = await post("/v1/app/create", info);
  if (rs.status === 200) {
    SendSuccessDialog("添加成功");
  } else {
    SendErrorDialog("添加失败, 错误信息: " + rs.status + rs.data.msg)
  }
  FinishLoadingBar();
}

</script>
