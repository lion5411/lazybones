<template>
  <div id="alarm-card">
    <div class="div-left-img"><image :src="iconPuchHole" /></div>
    <div class="div-right-content">
      <input v-model="title" />
      <textarea v-model="content" />
      <div><AlarmInfoButtonGroup :alarmInfo="alarmInfo" /></div>
      <button @click="onClick">click</button>
    </div>
  </div>
</template>

<script>
import AlarmInfoButtonGroup from "./AlarmInfoButtonGroup.vue";
import iconPuchHole from "../assets/note-punch-hole.svg";
import { toRefs } from "@vue/reactivity";
export default {
  name: "AlarmCard",
  components: { AlarmInfoButtonGroup },
  props: {
    alarmItem: {
      title: String,
      content: String,
      alarmInfo: Object,
    },
  },
  setup(props) {
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

    const { title, content, alarmInfo } = toRefs(props.alarmItem);
    console.log(title, content, alarmInfo);
    const onClick = () => {
      console.log(props);
    };

    return {
      title,
      content,
      alarmInfo,
      onClick,
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
