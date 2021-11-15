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
    addNewAlarm: ({ dispatch, state, commit }, value) => {
      const newItem = { title: "", content: "", alarmInfo: {} };
      state.alarm.alarmList.push(newItem);
      commit("setAlarmList", state.alarm.alarmList);
      chrome.runtime.sendMessage(
        {
          action: "INSERT",
          records: [newItem],
        },
        (e) => {
          console.log("new item added", e);
        }
      );
    },
  },
});
