<template>
  <div id="alarm-card">
    <div class="div-left-img"></div>
    <div class="div-right-content">
      <input
        class="input-alarm-title"
        v-model="title"
        @blur="updateData()"
        placeholder="제목을 입력하세요"
      />
      <textarea
        class="textarea-alarm-content"
        v-model="content"
        @blur="updateData()"
        placeholder="내용을 입력하세요"
      />
      <AlarmInfoButtonGroup :alarmInfo="alarmInfo" @updateData="updateData" />
      <!-- <button @click="deleteData">click</button> -->
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
      newItem.alarmInfo.alarmWeek =
        alarmInfo.value.alarmCycle === "WEEKLY"
          ? alarmInfo.value.alarmWeek || "MON"
          : null;
      newItem.alarmInfo.alarmDate = ["MONTHLY", "ONCE"].includes(
        alarmInfo.value.alarmCycle
      )
        ? alarmInfo.value.alarmDate || 1
        : null;

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

<style lang="less">
// @colors: #81bbff, #ff7373, #ffc107, #bdbdbd;
// @length: length(@colors);
// @random: `Math.random(3) `;

#alarm-card {
  width: 509px;
  min-height: 134px;
  max-height: 166px;

  border: 5px solid #2f2f2f;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #81bbff;

  display: flex;
  margin-bottom: 18px;

  .div-left-img {
    flex-basis: 10%;
    padding: 14px 0;
    background: repeat-y content-box url("../assets/note-punch-hole.svg");
  }
  .div-right-content {
    flex-basis: 90%;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    padding: 19px 25px 16px 25px;

    .input-alarm-title {
      margin-bottom: 6px;

      font-family: Noto Sans KR;
      font-weight: bold;
      font-size: 18px;
      line-height: 26px;
      color: #000000;

      border: none;
      &:focus {
        outline: none;
      }
    }
    .textarea-alarm-content {
      margin-bottom: 6px;

      font-family: Noto Serif KR;
      font-size: 12px;
      line-height: 17px;
      color: #000000;

      border: none;

      resize: none;

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
      }
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
