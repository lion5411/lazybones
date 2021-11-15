<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: "AppTitle",
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
