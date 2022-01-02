<template>
  <div width="auto">
    <v-select
      v-model="day"
      :items="weekDays"
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
  },
  methods: {
    getNextDayOfWeek(date, dayOfWeek) {
      const resultDate = new Date(date.getTime())

      resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7))

      return resultDate
    },
    dispatch(state, date) {
      const newValue = convertStringToDate(
        date,
        getHoursAndMinutes(state.value)
      )
      this.$store.dispatch('setFormField', {
        stateInformations: state,
        newValue,
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
        const day = new Date(this.startState.value).getDay()
        return day === 0 ? 7 : day
      },
      set(newValue) {
        newValue = this.getNextDayOfWeek(new Date(), newValue)
        this.dispatch(this.startState, newValue)
        this.dispatch(this.endState, newValue)
      },
    },
  },
}
</script>