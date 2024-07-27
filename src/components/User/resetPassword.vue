<template>
    <n-form :model="formValue">
      <n-form-item label="原密码" path="oldPassword">
        <n-input v-model:value="formValue.oldPassword" placeholder="请输入原密码" />
      </n-form-item>
      <n-form-item label="新密码" path="newPassword">
        <n-input v-model:value="formValue.newPassword" placeholder="请输入新密码" />
      </n-form-item>
      <n-form-item label="重复密码" path="confirmPassword">
        <n-input v-model:value="formValue.confirmPassword" placeholder="请在输入一遍新密码" />
      </n-form-item>
      <n-button type="primary" @click="submitForm" :loading="loading">提交</n-button>
    </n-form>
  </template>
  <script setup>
  import { ref, defineEmits } from "vue";
  import store from "@utils/stores/profile.js";
  import { post } from "@utils/request/axios.js";
  import { sendErrorMessage, sendSuccessMessage } from "@utils/message.js";
  import { FinishLoadingBar, StartLoadingBar } from "@utils/loadingbar.js";
  
  const loading = ref(false);
  const formValue = ref({
    "oldPassword": "",
    "newPassword": "",
    "confirmPassword": ""
  });
  
  const emit = defineEmits(["updateSuccess"]);
  
  async function submitForm() {
    StartLoadingBar();
    loading.value = true;
    formValue.value["username"] = store.getters.get_username;
    const rs = await post("/v1/users/reset/password", formValue.value);
    if (rs.status === 200) {
      loading.value = false;
      sendSuccessMessage("更新成功");
      emit("updateSuccess");
    } else {
      loading.value = false;
      sendErrorMessage("密码修改失败: " + rs.data.msg);
    }
    FinishLoadingBar();
  }
  </script>