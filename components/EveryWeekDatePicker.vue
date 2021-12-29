<template>
  <div>
    <v-select
      v-model="day"
      :items="weekDays"
      :label="$props.label"
      @change="getNextDayOfWeek(new Date(), day)"
    ></v-select>
    <HourIntervalPicker :getStart="$props.getStart" :getEnd="$props.getEnd" />
  </div>
</template>

<script>
import { getHoursAndMinutes, convertStringToDate } from '../services/dateHelper'
export default {
  data() {
    return {
      weekDays: [
        { text: 'lundi', value: 1 },
        { text: 'mardi', value: 2 },
        { text: 'mercredi', value: 3 },
        { text: 'jeudi', value: 4 },
        { text: 'vendredi', value: 5 },
        { text: 'samedi', value: 6 },
        { text: 'dimanche', value: 7 },
      ],
    }
  },
  props: {
    getStart: {
      type: String,
      required: true,
    },
    getEnd: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
  },
  methods: {
    getNextDayOfWeek(date, dayOfWeek) {
      const resultDate = new Date(date.getTime())

      resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7))

      return resultDate
    },
    commit(state, date) {
      this.$store.commit(`${state.storeName}/modify`, {
        payload: {
          [state.fieldName]: convertStringToDate(
            date,
            getHoursAndMinutes(state.value)
          ),
        },
        stateName: state.stateName,
      })
    },
  },
  computed: {
    startState() {
      return this.$store.getters.getStateFromString(this.$props.getStart)
    },
    endState() {
      return this.$store.getters.getStateFromString(this.$props.getEnd)
    },
    day: {
      get() {
        const date =
          this.$store.state[this.startState.storeName][
            this.startState.stateName
          ][this.startState.fieldName]
        if (date === undefined) return 0
        return new Date(date).getDay()
      },
      set(newValue) {
        newValue = this.getNextDayOfWeek(new Date(), newValue)
        this.commit(this.startState, newValue)
        this.commit(this.endState, newValue)
      },
    },
  },
}
</script>