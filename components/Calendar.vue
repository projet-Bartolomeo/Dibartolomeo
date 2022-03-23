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
              <v-col>
                <v-card class="d-flex justify-space-around pt-5 px-5 ml-5 mr-5">
                  <div class="d-flex">
                    <p class="ma-0 pr-3">Récurrence :</p>
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
              </v-col>

              <v-col>
                <DataTableStudent
                  v-if="userType === 'professor'"
                  datas="fromLesson"
                  message
                  lesson
                />

                <v-card
                  v-else
                  class="
                    d-flex
                    justify-space-around justify-center
                    py-5
                    ml-5
                    mr-5
                  "
                >
                  {{ selectedEvent.description || 'Pas de description'}}
                </v-card>
              </v-col>
              <div class="w-100 d-flex justify-center">
                <v-btn
                  v-if="!isRegister"
                  class="ma-2"
                  style="color: white"
                  color="#76d9a3"
                  @click="$store.dispatch('lesson/subscribe')"
                >
                  S'INSCRIRE
                </v-btn>
                <v-btn
                  v-if="isRegister"
                  class="ma-2"
                  style="color: white"
                  color="#76d9a3"
                  @click="$store.dispatch('lesson/unsubscribe')"
                >
                  SE DESINSCRIRE
                </v-btn>
              </div>
              <v-row
                v-if="userType === 'professor'"
                class="ma-0 d-flex justify-center align-center pb-4"
              >
                <router-link
                  class="text-decoration-none"
                  :to="`/professor/lesson/?id=${selectedEvent.id}`"
                >
                  <v-btn
                    class="my-5"
                    style="color: white"
                    color="#76d9a3"
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
                      title: 'Voulez-vous archiver ce cours',
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




        if(this.$props.userType === 'professor'){
          if (currentLesson.studentIds.length >= currentLesson.maximumStudents) {
            currentLesson.color = '#d9d9d9'
          }else{
            currentLesson.color = '#76d9a3'

          } 
        }
        else if(this.$props.userType === 'student'){
          if(currentLesson.studentIds.includes(this.$store.state.user.id)){
            currentLesson.color = '#53b3e6'
          }else if(!currentLesson.studentIds.includes(this.$store.state.user.id)){                    
            if (currentLesson.studentIds.length >= currentLesson.maximumStudents) {
                currentLesson.color = '#d9d9d9'
            }else{
              currentLesson.color = '#76d9a3'
            }
          }
        }

        const lesson = {
          ...currentLesson,
          start: convertTimestampToPlanningDate(currentLesson.startDate),
          end: convertTimestampToPlanningDate(currentLesson.endDate),
          recurrence: Recurrence[currentLesson.recurrence],
          ageRange: Age[currentLesson.ageRange],
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