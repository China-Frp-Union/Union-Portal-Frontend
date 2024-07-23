<template>
    <n-space id="header" justify="space-between">
        <n-gradient-text :size="24" type="warning">
            中国内网穿透联盟管理系统
        </n-gradient-text>
        <Menu></Menu>
    </n-space>
</template>
<script setup>
import Menu from "./Menu.vue";
</script>
<style scoped>
#header {
    margin: 16px;
}
</style>