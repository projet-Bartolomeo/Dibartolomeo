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
          color="primary"
          :events="events"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
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
                <v-toolbar-title v-html="selectedEvent.name"
                  ><v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                    <v-col cols="12" sm="4" md="4"> </v-col> </v-btn
                ></v-toolbar-title>
                <v-text>15/20 élèves</v-text>
              </v-col>
              <v-row class="ma-0 pa-5 justify-end">
                <v-btn text @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-row>
            </v-row>
            <v-spacer></v-spacer>

            <v-card flat>
              <v-row class="ma-0 justify-space-around pt-5">
                <div class="d-flex">
                  <p class="ma-0 pr-3">Récurence :</p>
                  <p>Unique</p>
                </div>
                <div class="d-flex">
                  <p class="ma-0 pr-3">Age :</p>
                  <p>Sénior</p>
                </div>
                <div class="d-flex">
                  <p class="ma-0 pr-3">Prix :</p>
                  <p>20</p>
                  €
                </div>
              </v-row>
              <v-col class="mt-5">
                <datatable-students />
              </v-col>
              <v-row class="ma-0 justify-space-around align-center">
                <router-link class="text-decoration-none" to="/formClasses">
                  <v-btn
                    class="my-5"
                    style="color: white"
                    color="teal lighten-2"
                  >
                    Modifier le cours
                  </v-btn>
                </router-link>
                <v-btn class="my-5" color="error"> Supprimer le cours </v-btn>
              </v-row>
            </v-card>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
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
    events: [
      {
        name: 'Cours dessins fantastique',
        start: '2021-11-12 09:00',
        end: '2021-11-12 10:00',
        color: 'green',
      },
    ],
  }),
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
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
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

    updateRange({ start, end }) {
      const events = []
      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)
      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }
      this.events = events
    },
  },
}
</script>