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
    <v-card-title
      v-if="$props.lesson.recurrence === 'unique'"
      class="text-h5 overflow-wrap-normal"
    >
      {{
        $props.archive
          ? 'Voulez-vous archiver ce cours ?'
          : 'Voulez-vous enregistrer vos modifications?'
      }}
    </v-card-title>

    <v-radio-group
      v-if="$props.lesson.recurrence === 'everyWeek'"
      v-model="optionSelected"
    >
      <v-radio label="Uniquement ce cours" :value='0'></v-radio>
      <v-radio label="Plusieurs cours avec la même récurrence" :value='1'></v-radio>
      <v-radio label="Tous les cours avec la même récurrence" :value='2'></v-radio>
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
          v-model="startDate"
          locale="fr"
          color="#76d9a3"
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
          v-model="endDate"
          locale="fr"
          color="#76d9a3"
          @input="endDateMenu = false"
        ></v-date-picker>
      </v-menu>
    </div>

    <div class="mt-4 mb-4">
      <v-btn
        class="white--text ml-3 mr-3"
        text
        color="blue-grey darken-1"
        @click="$store.commit('overlay/close')"
        >annuler</v-btn
      >
      <v-btn
        class="white--text ml-3 mr-3"
        text
        color="blue-grey darken-1"
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
      required: true
    },
    payload: {
      type: Object,
      required: false,
      default: () => {}
    },
    modify: {
      type: Boolean,
      required: false
    },
    archive: {
      type: Boolean,
      required: false
    },
    redirectPath: {
      type: String,
      required: false,
      default: ''
    },
    student: {
      type: Object,
      required: false,
      default: () => {}
    }
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
      description: 'le cours a bien été mis à jour',
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
    }
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
      if (this.$props.student) {
        const hasToBeDeleted = this.lesson.studentIds.find(
          (id) => id === this.student.id
        )
        const dispatchData = {
          student: this.student, lesson: this.$props.lesson
        }
        this.description = undefined

        if (hasToBeDeleted) {
          this.$store.dispatch('lesson/removeStudentInLesson', dispatchData)
        } else {
          this.$store.dispatch('lesson/addStudentInLesson', dispatchData)
        }
      }

      const lessonParameters = this.getLessonParameters()
      this.$store.commit('overlay/close')

      await this.$store.dispatch(`lesson/${action}`, lessonParameters)
      if (this.$props.redirectPath) this.$router.push(this.$props.redirectPath)
    },
    getLessonParameters() {
      const parameters = {
        lesson: this.$props.lesson,
        newData: this.$props.payload,
        all: this.optionSelected === 2 && this.isRecurrent,
        startDate:
          this.optionSelected === 1 && this.isRecurrent
            ? new Date(this.startDate)
            : null,
        endDate:
          this.optionSelected === 1 && this.isRecurrent
            ? new Date(this.endDate)
            : null,
        description: this.description
      }
      return parameters
    }
  }
}
</script>

<style>
.lesson-modification-form {
  width: 40vw;
  min-width: 300px;
}
</style>
