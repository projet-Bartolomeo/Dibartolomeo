<template>
  <div>
    <div class="d-flex ml-6">
      <div class="ml-4">de</div>
      <input class="ml-6" v-model="startHour" type="time" />
    </div>
    <div class="d-flex ml-6">
      <div class="ml-6">à</div>
      <input class="ml-6" v-model="endHour" type="time" />
    </div>
  </div>
</template>

<script>
import {
  getHoursAndMinutes,
  convertStringToDate,
  convertDateToIso,
} from '../services/dateHelper'
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
  methods: {
    dispatch(state, date, hourly) {
      const newValue = convertStringToDate(date, hourly)
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
    date() {
      if (this.startState.value === undefined) return ''
      return convertDateToIso(this.startState.value)
    },
    startHour: {
      get() {
        if (this.startState.value === undefined) return ''
        return getHoursAndMinutes(new Date(this.startState.value))
      },
      set(newValue) {
        this.dispatch(this.startState, this.date, newValue)
      },
    },
    endHour: {
      get() {
        if (this.endState.value === undefined) return ''
        return getHoursAndMinutes(new Date(this.endState.value))
      },
      set(newValue) {
        this.dispatch(this.endState, this.date, newValue)
      },
    },
  },
}
</script>