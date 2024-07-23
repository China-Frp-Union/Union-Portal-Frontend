<template>
    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" responsive />
</template>

<script>
import { defineComponent, h } from "vue";
import { NIcon, useMessage } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  BookOutline as BookIcon,
  HomeOutline as HomeIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from "@vicons/ionicons5";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

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
      { default: () => "黑名单列表" }
    ),
    key: "blacklist",
    icon: renderIcon(HomeIcon)
  },
  {
    label: "账号管理",
    key: "manage-account",
    icon: renderIcon(BookIcon),
    children: [
      {
        type: "group",
        label: "账号",
        key: "account",
        children: [
          {
            label: "登录",
            key: "narrator",
            icon: renderIcon(PersonIcon)
          },
          {
            label: "申请账号",
            key: "sheep-man",
            icon: renderIcon(PersonIcon)
          }
        ]
      }
    ]
  }
];

export default defineComponent({
  setup() {
    const message = useMessage();
    return {
      menuOptions,
      handleUpdateValue(key, item) {
        message.info(`[onUpdate:value]: ${JSON.stringify(key)}`);
        message.info(`[onUpdate:value]: ${JSON.stringify(item)}`);
      }
    };
  }
});
</script>