<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <AppTitle msg="Welcome to Your Vue.js App" />
  <button @click="insertData">insert</button>
  <button @click="getAllRecord">get all</button>
  <button @click="getDetail">detail</button>
  <div>
    <ul>
      <li v-for="item in alarmList" :key="item.alarmId">
        {{ item.title }}
        <button @click="updateData(item)">update</button>
        <button @click="deleteData(item.alarmId)">delete</button>
        <div v-if="state.showDetail">
          <div>{{ item.title }}</div>
          <div>{{ item.content }}</div>
          <div>{{ item.alarmCycle }}</div>
          <div>{{ item.alarmDate }}</div>
          <div>{{ item.alarmTime }}</div>
          <div>{{ item.isActivated }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AppTitle from "./components/AppTitle.vue";
import { useStore } from "vuex";
import { computed, reactive } from "@vue/reactivity";

export default {
  name: "App",
  components: {
    AppTitle,
  },
  setup() {
    const store = useStore();
    const alarmList = computed(() => store.state.alarm.alarmList);
    const updateList = (alarmList) => store.commit("setAlarmList", alarmList);
    const getAlarmDetail = (alarm) => store.commit("setSelectedAlarm", alarm);

    const state = reactive({
      showDetail: false,
    });

    const openSetting = () => {
      chrome.tabs.create({
        url: chrome.extension.getURL("index.html"),
      });
    };
    const insertData = () => {
      chrome.runtime.sendMessage(
        {
          action: "INSERT",
          records: [
            {
              title: "새알람2",
              content: "이따 이거 해야해2",
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
    };
    const getAllRecord = () => {
      chrome.runtime.sendMessage(
        {
          action: "SELECT_ALL",
        },
        function(res) {
          console.log("111", res);
          updateList(res);
        }
      );
    };

    const updateData = (item) => {
      chrome.runtime.sendMessage(
        {
          action: "UPDATE",
          records: { ...item, title: "업데이트 완료" },
        },
        (e) => {
          console.log("this is callback", e);
        }
      );
    };

    const deleteData = (alarmId) => {
      chrome.runtime.sendMessage(
        {
          action: "DELETE",
          key: alarmId,
        },
        (e) => {
          console.log("this is callback", e);
        }
      );
    };

    const getDetail = () => {
      state.showDetail = !state.showDetail;
      alarmList.forEach((v) => {
        chrome.runtime.sendMessage(
          {
            action: "SELECT_BY_KEY",
            key: v.alarmId,
          },
          function(res) {
            console.log("222", res);
            getAlarmDetail(res);
          }
        );
      });
    };

    return {
      alarmList,
      updateList,
      openSetting,
      insertData,
      getAllRecord,
      updateData,
      deleteData,
      getDetail,
      state,
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
