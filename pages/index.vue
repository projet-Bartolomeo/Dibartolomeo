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
          locale="fr"
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="lessons"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-dialog
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          width="1000"
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-row class="ma-0">
              <v-col cols="12" sm="6">
                <v-toolbar-title v-html="selectedEvent.title"
                  ><v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                    <v-col cols="12" sm="4" md="4"> </v-col> </v-btn
                ></v-toolbar-title>
                <p>
                  {{ selectedEvent.studentNbr }} /
                  {{ selectedEvent.maximumStudents }} élèves
                </p>
              </v-col>
              <v-row class="ma-0 pa-5 justify-end">
                <v-btn text @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-row>
            </v-row>
            <v-spacer></v-spacer>

            <v-card flat>
              <v-card class="d-flex justify-space-around pt-10 ml-5 mr-5">
                <div class="d-flex">
                  <p class="ma-0 pr-3">Récurence :</p>
                  <p>{{ selectedEvent.recurrence }}</p>
                </div>
                <div class="d-flex">
                  <p class="ma-0 pr-3">Age :</p>
                  <p>{{ selectedEvent.ageRange }}</p>
                </div>
                <div class="d-flex">
                  <p class="ma-0 pr-3">Prix :</p>
                  <p>{{ selectedEvent.price }}</p>
                  €
                </div>
              </v-card>
              <v-col>
                <DataTableStudent datas="fromLesson" message lesson />
              </v-col>
              <v-row class="ma-0 justify-space-around align-center">
                <router-link
                  class="text-decoration-none"
                  :to="`/lesson/?id=${selectedEvent.id}`"
                >
                  <v-btn
                    class="my-5"
                    style="color: white"
                    color="teal lighten-2"
                  >
                    Modifier le cours
                  </v-btn>
                </router-link>
                <v-btn
                  color="error"
                  @click="
                    $store.commit('overlay/open', {
                      component: 'LessonModificationForm',
                      props: {
                        lesson: selectedEvent,
                        archive: true,
                        redirectPath: '',
                      },
                      title: 'Voulez-vous archiver :',
                    })
                  "
                >
                  Supprimer le cours
                </v-btn>
              </v-row>
            </v-card>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { convertTimestampToPlanningDate } from '../services/dateHelper'
import { Recurrence } from '../enums/Recurrence'
import { Age } from '../enums/Age'

export default {
  data: () => ({
    colors: ['grey', 'green'],
    open: false,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      '4day': '4 jours',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  computed: {
    lessons() {
      const lessonList = this.$store.state.lesson.teacherList
      return lessonList.reduce((newLessonList, currentLesson) => {
        const lesson = {
          ...currentLesson,
          start: convertTimestampToPlanningDate(currentLesson.startDate),
          end: convertTimestampToPlanningDate(currentLesson.endDate),
          recurrence: Recurrence[currentLesson.recurrence],
          ageRange: Age[currentLesson.ageRange],
          studentNbr: currentLesson.teacherIds.length,
          name: currentLesson.title,
        }
        newLessonList.push(lesson)
        return newLessonList
      }, [])
    },
  },
  async created() {
    await this.$store.dispatch('lesson/setTeacherList', {})
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
    },
  },
}
</script>