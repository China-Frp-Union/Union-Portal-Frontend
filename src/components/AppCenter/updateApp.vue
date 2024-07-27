<template>
  <n-form :model="formValue">
    <n-form-item label="应用名" path="appName">
      <n-input v-model:value="formValue.appName" placeholder="请输入应用名" />
    </n-form-item>
    <n-form-item label="应用描述" path="appDescription">
      <n-input v-model:value="formValue.appDescription" placeholder="请输入应用描述" />
    </n-form-item>
    <n-button type="primary" @click="submitForm">提交</n-button>
  </n-form>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";
import store from "@utils/stores/profile.js";
import { post } from "@utils/request/axios.js";
import { sendErrorMessage, sendSuccessMessage } from "@utils/message.js";
import { FinishLoadingBar, StartLoadingBar } from "@utils/loadingbar.js";

const formValue = ref({
  "appName": "",
  "appDescription": ""
})

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(["updateSuccess"])

async function submitForm() {
  StartLoadingBar();
  const info = getInfo(formValue.value);
  info["username"] = store.getters.get_username;
  info["id"] = props.id
  const rs = await post("/v1/app/update", info);
  if (rs.status === 200) {
    sendSuccessMessage("更新成功");
    emit("updateSuccess");
  } else {
    sendErrorMessage("更新失败: " + rs.data.msg);
  }
  FinishLoadingBar();
}
// 取出不为空的值
function getInfo(array) {
  const filledFields = {};
  for (const key in array) {
    if (array[key] !== '' && array[key] !== null && array[key] !== undefined) {
      filledFields[key] = array[key];
    }
  }
  return filledFields;
}
</script>