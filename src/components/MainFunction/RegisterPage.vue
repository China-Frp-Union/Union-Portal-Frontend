<template>
  <div>
    <n-form @submit="register">
      <n-form-item label="网站名称">
        <n-input v-model="formData.name" placeholder="网站名称"/>
      </n-form-item>
      <n-form-item label="描述">
        <n-input v-model="formData.description" placeholder="描述"/>
      </n-form-item>
      <n-form-item label="Logo 链接">
        <n-input v-model="formData.logoUrl" placeholder="Logo 链接"/>
      </n-form-item>
      <n-form-item label="网站链接">
        <n-input v-model="formData.url" />
      </n-form-item>
      <n-form-item label="联系方式">
        <n-input v-model="formData.contact" />
      </n-form-item>
      <n-form-item label="用户名">
        <n-input v-model="formData.username" />
      </n-form-item>
      <n-form-item label="密码">
        <n-input v-model="formData.password" type="password" />
      </n-form-item>
      <n-form-item label="邮箱">
        <n-input v-model="formData.email" />
      </n-form-item>
      <n-button
          type="primary"
          htmlType="submit"
          @click=register()
      >
        注册
      </n-button>
    </n-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { post } from "../../utils/request/axios.js";
import { sendSuccessMessage, sendErrorMessage} from '../../utils/message.js';

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
// ui没啥看的 主要我的意见是 把请求重写一下（）
async function register() {
  const response = await post('/v1/application/create', formData.value);
  if (response.status === 200) {
    sendSuccessMessage(response.data);
  } else {
    sendErrorMessage(response.data)
  }
}
</script>