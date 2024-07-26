<template>
  <n-form :model="formValue">
    <n-form-item label="站点名" path="name">
      <n-input v-model:value="formValue.name" placeholder="请输入站点名"/>
    </n-form-item>
    <n-form-item label="站点描述" path="description">
      <n-input v-model:value="formValue.description" placeholder="请输入站点描述"/>
    </n-form-item>
    <n-form-item label="站点 URL" path="url">
      <n-input v-model:value="formValue.url" placeholder="请输入站点 URL"/>
    </n-form-item>
    <n-form-item label="LOGO URL" path="logoUrl">
      <n-input v-model:value="formValue.logoUrl" placeholder="请输入站点 LOGO URL"/>
    </n-form-item>
    <n-button type="primary" @click="submitForm">提交</n-button>
  </n-form>
</template>
<script setup>
import { ref, defineProps } from "vue";
import store from "@utils/stores/profile.js";
import { post } from "@utils/request/axios.js";
import { sendErrorMessage, sendSuccessMessage } from "@utils/message.js";

const formValue = ref({
  "name": "",
  "description": "",
  "url": "",
  "logoUrl": ""
})

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})


async function submitForm(){
  const info = getInfo(formValue.value);
  info["username"] = store.getters.get_username;
  info["id"] = props.id
  const rs = await post("/v1/site/update", info);
  if (rs.status === 200) {
    sendSuccessMessage("更新成功");
  } else {
    sendErrorMessage("更新失败: " + rs.data.msg);
  }

}
// 取出不为空的值
function getInfo(array){
  const filledFields = {};
  for (const key in array){
    if (array[key] !== '' && array[key] !== null && array[key] !== undefined) {
      filledFields[key] = array[key];
    }
  }
  return filledFields;
}
</script>