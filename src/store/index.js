import { createStore } from "vuex";
export default createStore({
  state: {
    alarm: {
      alarmList: [],
      selectedAlarm: {},
    },
  },
  getters: {
    getAlarmList(state) {
      return state.alarm.alarmList;
    },
  },
  mutations: {
    setAlarmList(state, value) {
      state.alarm.alarmList = value;
    },
    setSelectedAlarm(state, value) {
      state.alarm.selectedAlarm = value;
    },
  },
  actions: {},
});
