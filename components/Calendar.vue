<template>
  <v-row class="fill-height">
    <v-col>
      <h1 class="ma-4">Planning</h1>
      <v-sheet elevation="7" height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Aujourd'hui
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template #activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mois</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semaine</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 Jours</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Jour</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet elevation="7" height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          locale="fr"
          color="blue-grey lighten-4"
          :events="lessons"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { convertDateToPlanningDate } from '../services/dateHelper'

export default {
  props: {
    userType: {
      type: String,
      required: true
    }
  },
  data: () => ({
    colors: ['grey', 'green'],
    open: false,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      '4day': '4 jours'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  computed: {
    lessons() {
      const lessonList =
        this.$props.userType === 'student'
          ? this.$store.state.lesson.studentList
          : this.$store.state.lesson.teacherList

      return lessonList.reduce((newLessonList, currentLesson) => {
        if (this.$props.userType === 'professor') {
          if (
            currentLesson.studentIds.length >= currentLesson.maximumStudents
          ) {
            currentLesson.color = '#d9d9d9'
          } else {
            currentLesson.color = '#76d9a3'
          }
        } else if (this.$props.userType === 'student') {
          if (currentLesson.studentIds.includes(this.$store.state.user.id)) {
            currentLesson.color = '#53b3e6'
          } else if (
            !currentLesson.studentIds.includes(this.$store.state.user.id)
          ) {
            if (
              currentLesson.studentIds.length >= currentLesson.maximumStudents
            ) {
              currentLesson.color = '#d9d9d9'
            } else {
              currentLesson.color = '#76d9a3'
            }
          }
        }

        const lesson = {
          ...currentLesson,
          start: convertDateToPlanningDate(currentLesson.startDate),
          end: convertDateToPlanningDate(currentLesson.endDate),
          studentNbr: currentLesson.studentIds.length,
          color: currentLesson.color,
          name: currentLesson.title
        }
        newLessonList.push(lesson)
        return newLessonList
      }, [])
    },
    isRegister() {
      const studentIds = this.$store.state.lesson.details.studentIds
      return studentIds && studentIds.includes(this.$store.state.user.id)
    }
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },

    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    async showStudent(event) {
      this.$store.commit('overlay/open', {
        component: 'CalendarDetails'
      })
      await this.$store.dispatch('lesson/setDetails', { lessonId: event.id })
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.showStudent(event)
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    }
  }
}
</script>