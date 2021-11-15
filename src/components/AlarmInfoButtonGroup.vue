<template>
  <div>
    <image v-if="isActivated" :src="iconAlarmOn" />
    <image v-if="!isActivated" :src="iconAlarmOff" />
    <span
      ><select v-model="alarmCycle">
        <option value="ONCE">한번만</option>
        <option value="DAILY">매일</option>
        <option value="WEEKLY">매주</option>
        <option value="MONTHLY">매달</option>
      </select></span
    >
    <span v-if="alarmCycle === 'MONTHLY'"
      ><select>
        <option>1일</option>
        <option>2일</option>
        <option>3일</option>
        <option>4일</option>
      </select></span
    >
    <span
      ><select>
        <option>오후2시</option>
        <option>오후3시</option>
        <option>오후4시</option>
        <option>오후5시</option>
      </select></span
    >
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import iconAlarmOn from "../assets/bell-on.svg";
import iconAlarmOff from "../assets/bell-off.svg";
export default {
  props: {
    alarmInfo: {
      isActivated: Boolean,
      alarmCycle: String,
      alarmDate: Number,
      alarmTime: Number,
    },
  },
  setup(props, { emit }) {
    const { isActivated, alarmCycle = "ONCE", alarmDate, alarmTime } = toRefs(
      props.alarmInfo
    );
    console.log(props, isActivated, alarmCycle, alarmDate, alarmTime);
    return {
      iconAlarmOn,
      iconAlarmOff,
      isActivated,
      alarmCycle,
      alarmDate,
      alarmTime,
    };
  },
};
</script>

<style></style>
