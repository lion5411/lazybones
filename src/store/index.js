import { createStore } from "vuex";
export default createStore({
  state: {
    alarm: {
      alarmList: [],
      selectedAlarm: {},
    },
  },
  getters: {},
  mutations: {
    setAlarmList(state, value) {
      state.alarm.alarmList = value;
    },
  },
  actions: {
    addNewAlarm: ({ state, commit }) => {
      const newItem = {
        title: "",
        content: "",
        alarmInfo: {
          isActivated: false,
          alarmCycle: "ONCE",
          alarmDate: null,
          alarmTime: 12,
        },
      };
      chrome.runtime.sendMessage(
        {
          action: "INSERT",
          records: [newItem],
        },
        (alarmIds) => {
          console.log("new item added", alarmIds[0], newItem);
          newItem.alarmId = alarmIds[0];
          state.alarm.alarmList.push(newItem);
        }
      );
    },
    updateAlarm: ({ state }, item) => {
      const idx = state.alarm.alarmList.findIndex(
        (v) => v.alarmId === item.alarmId
      );
      if (idx >= 0) {
        state.alarm.alarmList[idx] = item;
        chrome.runtime.sendMessage(
          {
            action: "UPDATE",
            records: item,
          },
          (e) => {
            console.log("update complete", e);
          }
        );
      }
    },
    deleteAlarm: ({ state }, alarmId) => {
      const idx = state.alarm.alarmList.findIndex((v) => v.alarmId === alarmId);
      if (idx >= 0) {
        state.alarm.alarmList.splice(idx, 1);
        chrome.runtime.sendMessage(
          {
            action: "DELETE",
            key: alarmId,
          },
          (e) => {
            console.log("item deleted", e);
          }
        );
      }
    },
  },
});
