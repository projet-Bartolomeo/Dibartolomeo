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
  data() {
    return {
      weekDays: [
        { text: 'Lundi', value: 1 },
        { text: 'Mardi', value: 2 },
        { text: 'Mercredi', value: 3 },
        { text: 'Jeudi', value: 4 },
        { text: 'Vendredi', value: 5 },
        { text: 'Samedi', value: 6 },
        { text: 'Dimanche', value: 7 },
      ],
    }
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
}
</script>