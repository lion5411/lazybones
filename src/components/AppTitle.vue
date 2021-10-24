<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: "AppTitle",
  // mounted() {
  //   chrome.runtime.sendMessage({}, (e) => {
  //     console.log("after mounted", e);
  //   });
  // },
  computed: {
    defaultText() {
      return chrome.i18n.getMessage("extName");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
