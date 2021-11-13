<template>
  <div id="alarm-card">
    <div class="div-left-img"><image :src="iconPuchHole" /></div>
    <div class="div-right-content">
      <input v-model="alarm.title" />
      <textarea v-model="alarm.content" />
      <div><AlarmInfoButtonGroup :alarmInfo="alarm.alarmInfo" /></div>
      <button @click="onClick">click</button>
    </div>
  </div>
</template>

<script>
import AlarmInfoButtonGroup from "./AlarmInfoButtonGroup.vue";
import iconPuchHole from "../assets/note-punch-hole.svg";
export default {
  name: "AlarmCard",
  components: { AlarmInfoButtonGroup },

  setup() {
    const alarm = {
      title: "새알람2",
      content: "이따 이거 해야해2",
      alarmInfo: {
        isActivated: true,
        alarmCycle: "ONCE",
        alarmDate: 1,
        alarmTime: 16,
      },
    };

    const onClick = () => {
      console.log(alarm);
    };

    return { alarm, onClick, iconPuchHole };
  },
};
</script>

<style scoped>
#alarm-card {
  background-color: darkkhaki;
  width: 500px;
  display: flex;
}
.div-left-img {
  flex-basis: 10%;
}
.div-right-content {
  flex-basis: 90%;
  display: flex;
  flex-direction: column;
}
</style>
