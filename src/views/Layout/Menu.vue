<template>
  <n-modal
    v-model:show="showResetPassword"
    :mask-closable="false"
    preset="card"
    style="width: 600px"
    title="修改密码"
  >
    <resetPassword @updateSuccess="handleUpdateSuccess()"></resetPassword>
  </n-modal>
  <n-menu
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
    responsive
  />
</template>

<script setup>
import { h } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  BookOutline as BookIcon,
  HomeOutline as HomeIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from "@vicons/ionicons5";
import store from "@utils/stores/profile.js";
import router from "@src/router/index.js";
import resetPassword from "@src/components/User/resetPassword.vue";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function handleUpdateSuccess() {
  showResetPassword.value = false;
}

const showResetPassword = ref(false);
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "MainPage",
          },
        },
        { default: () => "首页" }
      ),
    key: "MainPage",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "blacklist",
          },
        },
        { default: () => "黑名单列表" }
      ),
    key: "blacklist",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "apply",
          },
        },
        { default: () => "申请管理" }
      ),
    key: "apply",
    icon: renderIcon(WineIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "app",
          },
        },
        { default: () => "应用管理" }
      ),
    key: "app",
    icon: renderIcon(BookIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "site",
          },
        },
        { default: () => "站点管理" }
      ),
    key: "site",
    icon: renderIcon(PersonIcon),
  },
  {
    label: "用户",
    key: "manage-account",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "账号",
        key: "account",
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: "login",
                  },
                },
                { default: () => "登录" }
              ),
            key: "login",
            icon: renderIcon(PersonIcon),
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: "join",
                  },
                },
                { default: () => "申请加入" }
              ),
            key: "join",
            icon: renderIcon(PersonIcon),
          },
        ],
      },
    ],
  },
  {
    label: store.getters.get_username,
    key: "username_label",
    children: [
      {
        label: () =>
          h(
            "a",
            {
              onClick: () => {
                showResetPassword.value = true;
              },
            },
            "修改密码"
          ),
        key: "reset_password",
      },
      {
        label: () =>
          h(
            "a",
            {
              onClick: () => {
                store.commit("delete_token");
                store.commit("delete_user_info");
                router.push("/login");
              },
            },
            "退出登录"
          ),
        key: "logout",
      },
    ],
  },
];

const token = store.getters.get_token;
const permission = Number(store.getters.get_permission);
// 权限管理 token 或 permission 不存在时
if (!token) {
  // 删除 申请管理 和 应用管理 和 站点管理
  menuOptions.splice(2, 3);
  menuOptions.splice(3, 1);
} else if (permission === 0) {
  // 普通用户 删除 申请管理
  menuOptions.splice(2, 1);
  // 删掉用户
  menuOptions.splice(4, 1);
} else {
  // 啥也不干
  // 删掉用户
  menuOptions.splice(5, 1);
}
</script>
<script>
import { ref } from "vue";

const activeKey = ref("");
export function handleActiveKeyChange(name) {
  activeKey.value = name;
}
</script>
