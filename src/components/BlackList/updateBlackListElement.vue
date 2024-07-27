<template>
  <n-form :model="formValue">
    <n-form-item label="邮箱" path="email">
      <n-input v-model:value="formValue.email" placeholder="请输入邮箱, 多个邮箱可用 ; 分隔" />
    </n-form-item>
    <n-form-item label="原因" path="reason">
      <n-input v-model:value="formValue.reason" placeholder="请输入原因" />
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
  "email": "",
  "reason": ""
})

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(["updateSuccess"]);

async function submitForm() {
  StartLoadingBar();
  const info = getInfo(formValue.value);
  info["username"] = store.getters.get_username;
  info["id"] = props.id;
  const rs = await post("/v1/blacklist/update/web", info);
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