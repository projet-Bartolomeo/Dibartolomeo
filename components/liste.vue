<template>
<div>
     <v-radio-group
     
    >
      <v-radio label="S'inscrire Uniquement ce cours" value="0"></v-radio>
      <v-radio label="S'inscrire du au " value="1"></v-radio>
      <v-radio label="S'inscrire à tous les cours " value="3"></v-radio>
    </v-radio-group>
    <div v-if="optionSelected === 1" class="d-flex ma-4">
      <v-menu
        v-model="startDateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="startDateFormatted"
            class="ma-2"
            label="Date de début"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          locale="fr"
          color="teal lighten-2"
          v-model="startDate"
          @input="startDateMenu = false"
        ></v-date-picker>
      </v-menu>
      <v-menu
        v-model="endDateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="endDateFormatted"
            class="ma-2"
            label="Date de fin"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          locale="fr"
          color="teal lighten-2"
          v-model="endDate"
          @input="endDateMenu = false"
        ></v-date-picker>
      </v-menu>
    </div>
</div>
</template>
<script>
export default {
  props: {
    lesson: {
      type: Object,
      required: true,
    },
    payload: {
      type: Object,
      required: false,
    },
    modify: {
      type: Boolean,
      required: false,
    },
    archive: {
      type: Boolean,
      required: false,
    },
    redirectPath: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      min: new Date().toISOString(),
      startDateMenu: false,
      endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      endDateMenu: false,
      optionSelected: 0,
    }
  },
  computed: {
    isRecurrent() {
      return this.$props.lesson.recurrence !== 'unique'
    },
    endDateFormatted() {
      return this.formatDate(this.endDate)
    },
    startDateFormatted() {
      return this.formatDate(this.startDate)
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    modifyLesson() {
      this.changeLessonInDatabase('modify')
    },
    archiveLesson() {
      this.changeLessonInDatabase('archive')
    },
    async changeLessonInDatabase(action) {
      const lessonParameters = this.getLessonParameters()
      this.$store.commit('overlay/close')
      await this.$store.dispatch(`lesson/${action}`, lessonParameters)
      if (this.$props.redirectPath) this.$router.push(this.$props.redirectPath)
    },
    getLessonParameters() {
      const parameters = {
        lesson: this.$props.lesson,
        payload: this.$props.payload,
        all: this.optionSelected === 2 && this.isRecurrent,
        startDate:
          this.optionSelected === 1 && this.isRecurrent
            ? new Date(this.startDate)
            : null,
        endDate:
          this.optionSelected === 1 && this.isRecurrent
            ? new Date(this.endDate)
            : null,
      }
      return parameters
    },
  },
}
</script>

<style>
.lesson-modification-form {
  width: 40vw;
  min-width: 300px;
}
</style>
