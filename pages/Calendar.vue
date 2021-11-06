<template>
  <v-row class="fill-height" >
    <v-col>
      <v-sheet height="64" >
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
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
        >

          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          ><v-col
          cols="12"
          sm="6"
        >
              <v-toolbar-title v-html="selectedEvent.name" ><v-btn icon>
                
              <v-icon>mdi-pencil</v-icon>
              <v-col
            cols="12"
            sm="4"
            md="4"
            
          >
              </v-col>
              </v-btn></v-toolbar-title>
              </v-col>
              <v-text>15/20</v-text>
              
              
               <v-spacer></v-spacer>
           <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row align="center" >
          <v-col
            cols="12"
            sm="4"
            md="4"
            
          >

            <v-toolbar-title>Recurence chaque semaine  <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
              </v-btn></v-toolbar-title> 
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4"
          >
           <v-toolbar-title >Age senior <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
              </v-btn>
              </v-toolbar-title> 
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4"
          >
           <v-toolbar-title >Prix : 20 <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
              </v-btn></v-toolbar-title>
          </v-col>
        </v-row>

        <v-row class="mt-12">
          <v-col
            cols="12"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="checkbox"
              label="tous cocher"
              hide-details
            ></v-checkbox>
          </v-col>
         
          <v-col
            cols="12"
            sm="4"
            md="4"
          >
            <v-btn
                color="blue-grey"
                @click="selectedOpen = false"
              >
               Envoyer message
              </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4"
          >
             <v-text-field
                  v-model="recherche"
                  label="Recherche"
                  outlined
                  type="text"
                  @keyup="search"
                  @click:clear="clearMessage"
                ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="40"
            md="3"
          >
          </v-col>
              <v-col
            cols="12"
            sm="45"
            md="7"
          >
           <DataTableuser />
              </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
            <v-card-actions>
               <v-col
            cols="12"
            sm="4"
            md="4"
            
          >
          </v-col>
              <v-btn
                color="teal"
                @click="selectedOpen = false"
              >
                Modifier le cour
              </v-btn>
                <v-col
            cols="12"
            sm="4"
            md="4"
            
          >
             </v-col>  
                <v-col
            cols="12"
            sm="4"
            md="4"
            
          >
               
              <v-btn
                color="error"
                @click="selectedOpen = false"
              >
                Suprimer
              </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event'],
  }),
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
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
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
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
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>
