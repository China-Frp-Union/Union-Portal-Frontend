<template>
    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" responsive />
</template>

<script setup>
import { h } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  BookOutline as BookIcon,
  HomeOutline as HomeIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from "@vicons/ionicons5";
import store from "../../utils/stores/profile.js";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const activeKey = ""
const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "MainPage",
        }
      },
      { default: () => "首页" }
    ),
    key: "MainPage",
    icon: renderIcon(HomeIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "blacklist",
        }
      },
      { default: () => "黑名单管理" }
    ),
    key: "blacklist",
    icon: renderIcon(HomeIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "join",
        }
      },
      { default: () => "申请管理" }
    ),
    key: "apply",
    icon: renderIcon(WineIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "app",
        }
      },
      { default: () => "应用管理" }
    ),
    key: "app",
    icon: renderIcon(BookIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: "site",
        }
      },
      { default: () => "站点管理" }
    ),
    key: "site",
    icon: renderIcon(PersonIcon)
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
            label: () => h(
                RouterLink,
                {
                  to: {
                    name: "login",
                  }
                },
                { default: () => "登录" }
            ),
            key: "narrator",
            icon: renderIcon(PersonIcon)
          },
          {
            label: () => h(
                RouterLink,
                {
                  to: {
                    name: "join",
                  }
                },
                { default: () => "申请加入" }
            ),
            key: "sheep-man",
            icon: renderIcon(PersonIcon)
          }
        ]
      }
    ]
  }
];

const token = store.getters.get_token;
const permission = Number(store.getters.get_permission);
console.log(permission)
// 权限管理 token 或 permission 不存在时
if (!token) {
  // 删除黑名单管理 和 申请管理 和 应用管理 和 站点管理
  menuOptions.splice(1, 4);
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