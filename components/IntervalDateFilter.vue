<template>
  <div>
    <v-container class="spacing-playground pa-6" fluid>
      <v-row>
        <v-menu
          ref="menu"
          v-model="startDateMenu"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="startDateFormatted"
              label="Date de début"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            color="#76d9a3"
            locale="fr"
            :max="endDate"
            @input="startDateMenu = false"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="endDateMenu"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="endDateFormatted"
              label="Date de fin"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            locale="fr"
            color="#76d9a3"
            :min="startDate"
            @input="endDateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    getStart: {
      type: String,
      reuqired: true,
      default: '',
    },
    getEnd: {
      type: String,
      reuqired: true,
      default: '',
    },
  },
  data() {
    return {
      startDateMenu: false,
      endDateMenu: false,
    }
  },
  computed: {
    endDateFormatted() {
      return this.formatDate(this.endState.value)
    },
    startDateFormatted() {
      return this.formatDate(this.startState.value)
    },
    startState() {
      return this.$store.getters.getStateFromString(this.$props.getStart)
    },
    endState() {
      return this.$store.getters.getStateFromString(this.$props.getEnd)
    },
    startDate: {
      get() {
        return this.startState.value
      },
      set(newValue) {
        this.filter(this.startState, newValue)
      },
    },
    endDate: {
      get() {
        return this.endState.value
      },
      set(newValue) {
        this.filter(this.endState, newValue)
      },
    },
  },
  methods: {
    filter(state, newValue) {
      this.$store.commit('lesson/modify', {
        stateName: state.stateName,
        payload: { [state.fieldName]: newValue },
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

<style>
.Datapicker {
  display: flex;
}
</style>
