<template>
  <div>
    <img v-show="isActivated" @click="handleActivate" :src="iconAlarmOn" />
    <img v-show="!isActivated" @click="handleActivate" :src="iconAlarmOff" />
    <span
      ><select v-model="alarmCycle" @change="handleSelected">
        <option value="ONCE">한번만</option>
        <option value="DAILY">매일</option>
        <option value="WEEKLY">매주</option>
        <option value="MONTHLY">매달</option>
      </select></span
    >
    <span v-if="alarmCycle === 'MONTHLY'"
      ><select v-model="alarmDate">
        <option>1일</option>
        <option>2일</option>
        <option>3일</option>
        <option>4일</option>
      </select></span
    >
    <span
      ><select v-model="alarmTime" @change="handleSelected">
        <option v-for="n in timeRange" :key="n" :value="n"
          >{{ n >= 12 ? "오후" : "오전" }}{{ n }}시</option
        >
      </select></span
    >
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import iconAlarmOn from "@/assets/bell-on.svg";
import iconAlarmOff from "@/assets/bell-off.svg";
import { onUpdated } from "@vue/runtime-core";
export default {
  props: {
    alarmInfo: {
      isActivated: Boolean,
      alarmCycle: String,
      alarmDate: Number,
      alarmTime: Number,
    },
  },
  emits: ["updateData"],
  setup(props, { emit }) {
    const timeRange = [...Array(24).keys()];
    const { isActivated, alarmCycle, alarmDate, alarmTime } = toRefs(
      props.alarmInfo
    );
    const handleActivate = () => {
      const nextState = !isActivated.value;
      emit("updateData", nextState);
    };
    const handleSelected = () => {
      emit("updateData");
    };

    return {
      timeRange,
      iconAlarmOn,
      iconAlarmOff,
      handleActivate,
      handleSelected,
      isActivated,
      alarmCycle,
      alarmDate,
      alarmTime,
    };
  },
};
</script>

<style></style>
