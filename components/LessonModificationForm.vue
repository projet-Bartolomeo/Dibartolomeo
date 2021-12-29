<template>
  <div
    class="
      d-flex
      align-center
      justify-center
      flex-column
      lesson-modification-form
    "
  >
    <v-radio-group v-model="optionSelected">
      <v-radio label="uniquement ce cours"></v-radio>
      <v-radio label="plusieurs cours avec la meme récurrence"></v-radio>
      <v-radio label="tous les cours avec la meme récurrence"></v-radio>
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
            v-model="startDate"
            class="ma-2"
            label="Date de début"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
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
            v-model="endDate"
            class="ma-2"
            label="Date de fin"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="endDate"
          @input="endDateMenu = false"
        ></v-date-picker>
      </v-menu>
    </div>
    <div class="mt-4 mb-4">
      <v-btn
        class="white--text ml-3 mr-3"
        color="blue darken-1"
        @click="$store.commit('overlay/close')"
        >annuler</v-btn
      >
      <v-btn
        class="white--text ml-3 mr-3"
        color="blue darken-1"
        @click="$props.modify ? modifyLesson() : archiveLesson()"
        >confirmer</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lesson: {
      type: Object,
      required: false,
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
  methods: {
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
        all: this.optionSelected === 2,
        startDate: this.optionSelected === 1 ? this.startDate : null,
        endDate: this.optionSelected === 1 ? this.endDate : null,
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
