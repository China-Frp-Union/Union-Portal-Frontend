<script setup>
import loadingBar from "./components/LoadingBar.vue";
import Message from "./components/Message.vue";
import DialogBox from "./components/Dialog.vue";
import Portal from "./views/Portal.vue";
</script>

<template>
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
</template>
