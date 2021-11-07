<template>
    <div class="calender">
        <div class="calendar-header"></div>
        <table class="calendar-body">
            <tbody>
                <tr>
                    <td
                        v-for="day in [
                            'MON',
                            'TUE',
                            'WED',
                            'THU',
                            'FRI',
                            'SAT',
                            'SUN',
                        ]"
                        :key="day"
                    >
                        {{ day }}
                    </td>
                </tr>
                <tr v-for="date in dateList" :key="date">
                    <td>{{ date || ' ' }}</td>

                    <!-- <td
                        v-for="date in dateList.slice(
                            index * 7,
                            Math.min((index + 1) * 7),
                            dateList.length()
                        )"
                        :key="date"
                    >
                        {{ date }}
                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Calendar',
    mounted() {},
    computed: {
        dateList() {
            const date = new Date()
            const firstDayOfThisMonth = new Date(
                date.getFullYear(),
                date.getMonth()
            ).getDay()
            const dayCountOfThisMonth = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0
            ).getDate()

            const dateList = []

            for (let i = 0; i < (firstDayOfThisMonth + 6) % 7; i++) {
                dateList.push(undefined)
            }

            for (let i = 0; i < dayCountOfThisMonth; i++) {
                dateList.push(i + 1)
            }

            return dateList
        },
    },
}
</script>

<style scoped>
p {
    font-size: 20px;
}
</style>
