<template>
  <AppTitle msg="Welcome to Your Vue.js App" />
  <button @click="openSetting">open Tab</button>
  <button @click="insertData">insert</button>
  <button @click="getAllRecord">get all</button>
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
import AppTitle from "../components/AppTitle.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const store = useStore();
    const alarmList = computed(() => store.state.alarm.alarmList);
    const updateList = (alarmList) => store.commit("setAlarmList", alarmList);

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
          updateList(res.response);
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

    return {
      alarmList,
      updateList,
      openSetting,
      insertData,
      getAllRecord,
      updateData,
      deleteData,
    };
  },
  components: { AppTitle },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
