<template>
  <AppTitle msg="Welcome to Your Vue.js App" />
  <div class="alarmContent">
    <AlarmCard
      v-for="item in alarmList"
      :key="item.alarmId"
      :alarmItem="item"
    />
    <button class="button-create-new-card" @click="addNewAlarm">
      <img :src="addCircle" />
      <span>새로운 할 일 만들기</span>
    </button>
  </div>
</template>

<script>
import AppTitle from "./components/AppTitle.vue";
import AlarmCard from "./components/AlarmCard.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import addCircle from "@/assets/add-circle.svg";

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
      alarmList,
      addNewAlarm,
      addCircle,
    };
  },
};
</script>

<style lang="less">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.alarmContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  .button-create-new-card {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 509px;
    height: 61px;

    cursor: pointer;

    border: 5px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: transparent;

    font-family: Noto Sans KR;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #bdbdbd;
    img {
      margin-right: 10px;
    }
  }
}
</style>
