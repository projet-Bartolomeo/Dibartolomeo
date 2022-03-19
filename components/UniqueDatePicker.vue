<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          :label="$props.label"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        locale="fr"
        color="#76d9a3"
        :min="new Date().toISOString()"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
    <HourIntervalPicker :getStart="$props.getStart" :getEnd="$props.getEnd" />
  </div>
</template>

<script>
import {
  convertDateToIso,
  convertStringToDate,
  getHoursAndMinutes,
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
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    dateFormatted() {
      return this.formatDate(this.date)
    },

    startState() {
      return this.$store.getters.getStateFromString(this.$props.getStart)
    },
    endState() {
      return this.$store.getters.getStateFromString(this.$props.getEnd)
    },
    date: {
      get() {
        const date =
          this.$store.state[this.startState.storeName][
            this.startState.stateName
          ][this.startState.fieldName]
        if (date === undefined) return ''
        return convertDateToIso(date)
      },
      set(newValue) {
        this.dispatch(this.startState, newValue)
        this.dispatch(this.endState, newValue)
      },
    },
  },
  methods: {
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

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
  },
}
</script>