<template>
  <img alt="Vue logo" :src="logo" />
  <AppTitle msg="Welcome to Your Vue.js App" />
  <AlarmCard v-for="item in alarmList" :key="item.alarmId" :alarmItem="item" />
  <button @click="addNewAlarm">새할일 만들기</button>

  <div>
    <ul>
      <li v-for="item in alarmList" :key="item.alarmId">
        {{ item.title }}
        <button @click="updateData(item)">update</button>
        <button @click="deleteData(item.alarmId)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import AppTitle from "./components/AppTitle.vue";
import AlarmCard from "./components/AlarmCard.vue";
import logo from "./assets/logo.png";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "App",
  components: {
    AppTitle,
    AlarmCard,
  },
  setup() {
    const store = useStore();
    const alarmList = computed(() => store.state.alarm.alarmList);
    const setDefaultList = (alarmList) =>
      store.commit("setAlarmList", alarmList);
    const addNewAlarm = () => store.dispatch("addNewAlarm");

    onMounted(() => {
      getAllRecord();
    });
    console.log(alarmList);

    const getAllRecord = () => {
      chrome.runtime.sendMessage(
        {
          action: "SELECT_ALL",
        },
        function(res) {
          setDefaultList(res);
        }
      );
    };

    return {
      logo,
      alarmList,
      addNewAlarm,
    };
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
