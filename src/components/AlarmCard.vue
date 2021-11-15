<template>
  <div id="alarm-card">
    <div class="div-left-img"><img :src="iconPuchHole" /></div>
    <div class="div-right-content">
      <input v-model="title" @blur="updateData()" />
      <textarea v-model="content" @blur="updateData()" />
      <div>
        <AlarmInfoButtonGroup
          :alarmInfo="alarmInfo"
          :alarmId="alarmId"
          @updateData="updateData"
        />
      </div>
      <button @click="deleteData">click</button>
    </div>
  </div>
</template>

<script>
import AlarmInfoButtonGroup from "./AlarmInfoButtonGroup.vue";
import iconPuchHole from "../assets/note-punch-hole.svg";
import { toRefs } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  name: "AlarmCard",
  components: { AlarmInfoButtonGroup },
  props: {
    alarmItem: {
      alarmId: Number,
      title: String,
      content: String,
      alarmInfo: Object,
    },
  },
  setup(props) {
    const store = useStore();
    const { alarmId, title, content, alarmInfo } = toRefs(props.alarmItem);
    const updateAlarm = (alarm) => store.dispatch("updateAlarm", alarm);
    const deleteAlarm = (alarmId) => store.dispatch("deleteAlarm", alarmId);

    const updateData = (isActivated) => {
      const newItem = {
        alarmId: alarmId.value,
        title: title.value,
        content: content.value,
        alarmInfo: alarmInfo.value,
      };
      newItem.alarmInfo.isActivated =
        isActivated ?? alarmInfo.value.isActivated;
      updateAlarm(newItem);
    };

    const deleteData = () => {
      deleteAlarm(alarmId.value);
    };

    return {
      alarmId,
      title,
      content,
      alarmInfo,
      iconPuchHole,
      updateData,
      deleteData,
    };
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
