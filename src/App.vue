<script setup>
import loadingBar from "./components/LoadingBar.vue";
import Message from "./components/Message.vue";
import DialogBox from "./components/Dialog.vue";
import Portal from "./views/Portal.vue";

import { computed } from 'vue'
import { darkTheme, useOsTheme } from "naive-ui";

const osThemeRef = useOsTheme();
const theme = computed(() => (osThemeRef.value === "dark" ? darkTheme : null));
</script>

<template>
  <n-config-provider :theme="theme">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <loadingBar />
          <Message />
          <DialogBox />
          <Portal />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
