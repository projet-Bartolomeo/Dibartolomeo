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
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          :label="$props.label"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        locale="fr"
        v-model="date"
        @input="menu = false"
        :min="new Date().toISOString()"
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
    },
  },
  data() {
    return {
      menu: false,
    }
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
  },
  computed: {
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
}
</script>