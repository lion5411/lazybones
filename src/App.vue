<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <AppTitle msg="Welcome to Your Vue.js App" />
  <button @click="insertData">insert</button>
</template>

<script>
import AppTitle from "./components/AppTitle.vue";

export default {
  name: "App",
  components: {
    AppTitle,
  },
  method: {
    insertData() {
      chrome.runtime.sendMessage(
        {
          action: "INSERT",
          records: [
            {
              title: "새알람",
              content: "이따 이거 해야해",
              isActivated: true,
              alarmCycle: "ONCE",
              alarmDate: 1,
              alarmTime: 16,
            },
          ],
        },
        (e) => {
          console.log("this is callback", e);
        }
      );
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
