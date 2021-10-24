<template>
  <AppTitle msg="Welcome to Your Vue.js App" />
  <button @click="openSetting">open Tab</button>
</template>

<script>
import AppTitle from "../components/AppTitle.vue";
export default {
  components: { AppTitle },
  methods: {
    openSetting() {
      chrome.tabs.create({
        url: chrome.extension.getURL("index.html"),
      });
    },
  },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
