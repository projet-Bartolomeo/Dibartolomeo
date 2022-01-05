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
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDate"
              label="Date de début"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="fr"
            v-model="startDate"
            @input="startDateMenu = false"
            :max="endDate"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="endDateMenu"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endDate"
              label="Date de fin"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="fr"
            v-model="endDate"
            @input="endDateMenu = false"
            :min="startDate"
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
    },
    getEnd: {
      type: String,
      reuqired: true,
    },
  },
  data() {
    return {
      startDateMenu: false,
      endDateMenu: false,
    }
  },
  computed: {
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
  },
}
</script>

<style>
.Datapicker {
  display: flex;
}
</style>
