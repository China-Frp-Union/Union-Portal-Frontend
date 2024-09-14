<template>
  <n-space id="header" justify="space-between">
    <n-gradient-text :size="24" type="warning">
      中国内网穿透联盟管理系统
    </n-gradient-text>
  </n-space>
  <Menu></Menu>
</template>
<script setup>
import Menu from "./Menu.vue";
</script>
<style scoped>
#header {
  margin-block: 10px;
  margin-left: 20px;
}
</style>
