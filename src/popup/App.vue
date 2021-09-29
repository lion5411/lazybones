<template>
  <button @click="openSetting" />
</template>

<script>

export default {
 methods:{
   openSetting(){
      browser.tabs.create({ active: true,  url: browser.extension.getURL('index.html') }, null);
   }
 }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
