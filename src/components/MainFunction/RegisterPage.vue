<template>
  <n-form>
    <n-form-item label="网站名称">
      <n-input v-model:value="formData.name" placeholder="网站名称" />
    </n-form-item>
    <n-form-item label="描述">
      <n-input v-model:value="formData.description" placeholder="描述" />
    </n-form-item>
    <n-form-item label="Logo 链接">
      <n-input v-model:value="formData.logoUrl" placeholder="Logo 链接" />
    </n-form-item>
    <n-form-item label="网站链接">
      <n-input v-model:value="formData.url" placeholder="网站链接" />
    </n-form-item>
    <n-form-item label="联系方式">
      <n-input v-model:value="formData.contact" placeholder="联系方式" />
    </n-form-item>
    <n-form-item label="用户名">
      <n-input v-model:value="formData.username" placeholder="用户名" />
    </n-form-item>
    <n-form-item label="密码">
      <n-input v-model:value="formData.password" type="password" placeholder="密码" />
    </n-form-item>
    <n-form-item label="邮箱">
      <n-input v-model:value="formData.email" placeholder="邮箱" />
    </n-form-item>
    <n-button type="primary" htmlType="submit" @click=register()>
      注册
    </n-button>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';
import { post } from "@utils/request/axios.js";
import { sendSuccessMessage, sendErrorMessage } from '@utils/message.js';

const formData = ref({
  name: '',
  description: '',
  logoUrl: '',
  url: '',
  contact: '',
  username: '',
  password: '',
  email: ''
});
function register() {
  const response = post('/v1/application/create', formData.value);
  response.then((res) => {
    if (res.status === 200) {
      sendSuccessMessage("成功提交申请");
    } else {
      sendErrorMessage("申请提交失败");
    }
  })
}

</script>