<template>
  <div style="text-align: center;">
    <div style="height: 100vh">
      <n-layout has-sider
        style="background-image: url('https://cdn.imlazy.ink:233/img/background/89217849_p0.jpg'); background-size: cover;min-height: 100vh">
        <n-layout-sider bordered content-style="display: flex; align-items: center; justify-content: center;"
          style="min-height: 100vh;background-color: rgba(255, 255, 255, 0.8);" width="20vw">
          <n-grid cols="1" item-responsive>
            <n-gi span="1">
              <n-h2 prefix="bar" align-text type="success">
                CFU 统一身份验证
              </n-h2>
            </n-gi>
            <n-gi span="1">
              <n-grid cols="1" item-responsive>
                <n-gi span="1" style="padding: 2vw">
                  <n-form>
                    <n-form-item label="用户名">
                      <n-input v-model:value="userInfo.username" placeholder="请输入用户名"></n-input>
                    </n-form-item>
                    <n-form-item label="密码">
                      <n-input v-model:value="userInfo.password" type="password" placeholder="请输入密码"></n-input>
                    </n-form-item>
                    <n-button type="primary" block :loading="loading" @click="userLogin();">登录</n-button>
                  </n-form>
                </n-gi>
              </n-grid>
            </n-gi>
          </n-grid>
        </n-layout-sider>
      </n-layout>
    </div>
  </div>
</template>
<script setup>

import { ref } from "vue";
import { useLoadingBar } from "naive-ui";
import { SendErrorDialog } from "../../utils/dialog.js"
import { post, getUrlKey } from "../../utils/request/axios"
import store from "../../utils/stores/profile.js";
import router from "../../router";

const loading = ref(false);
const ldb = useLoadingBar();
const userInfo = ref({
  "username": "",
  "password": ""
});
const data = getUrlKey("data");
var rsInfo = {
  "redirectUrl": ""
};
if (data != null) {
  rsInfo = JSON.parse(atob(data));
}

function userLogin() {
  loading.value = true;
  ldb.start();
  const rs = post("/v1/users/login", userInfo.value);
  rs.then((res) => {
    if (res.status === 200) {
      store.commit("set_token", res.data.token);
      store.commit("set_user_info", res.data);
      loading.value = false;
      ldb.finish();
      router.push("/")
    } else {
      SendErrorDialog(res.data);
      loading.value = false;
      ldb.error();
    }
  })
}

</script>