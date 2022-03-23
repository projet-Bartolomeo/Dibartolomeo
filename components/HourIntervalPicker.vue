<template>
  <div>
    <div class="d-flex">
      <div class="ml-4">de</div>
      <input v-model="startHour" class="ml-6" type="time" />
    </div>
    <div class="d-flex">
      <div class="ml-6">à</div>
      <input v-model="endHour" class="ml-6" type="time" />
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
    getstart: {
      type: String,
      required: true,
    },
    getend: {
      type: String,
      required: true,
    },
  },
  computed: {
    startState() {
      return this.$store.getters.getStateFromString(this.$props.getstart)
    },
    endState() {
      return this.$store.getters.getStateFromString(this.$props.getend)
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
  methods: {
    dispatch(state, date, hourly) {
      const newValue = convertStringToDate(date, hourly)
      this.$store.dispatch('setFormField', {
        stateInformations: state,
        newValue,
      })
    },
  },
}
</script>