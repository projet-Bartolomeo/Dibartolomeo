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
import { getHoursAndMinutes, convertStringToDate, convertDateToIso } from '../services/dateHelper'
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
    commit(state, date, hourly) {
      this.$store.commit(`${state.storeName}/modify`, {
        payload: {
          [state.fieldName]: convertStringToDate(date, hourly),
        },
        stateName: state.stateName,
      })
    },
  },
  computed: {
    date() {
      const date =
        this.$store.state[this.startState.storeName][this.startState.stateName][
          this.startState.fieldName
        ]
      if (date === undefined) return ''
      return convertDateToIso(date)
    },
    startState() {
      return this.$store.getters.getStateFromString(this.$props.getStart)
    },
    endState() {
      return this.$store.getters.getStateFromString(this.$props.getEnd)
    },
    startHour: {
      get() {
        const startHour =
          this.$store.state[this.startState.storeName][
            this.startState.stateName
          ][this.startState.fieldName]
        if (startHour === undefined) return ''
        return getHoursAndMinutes(new Date(startHour))
      },
      set(newValue) {
        this.commit(this.startState, this.date, newValue)
      },
    },
    endHour: {
      get() {
        const endHour =
          this.$store.state[this.endState.storeName][this.endState.stateName][
            this.endState.fieldName
          ]
        if (endHour === undefined) return ''
        return getHoursAndMinutes(new Date(endHour))
      },
      set(newValue) {
        this.commit(this.endState, this.date, newValue)
      },
    },
  },
}
</script>