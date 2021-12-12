<template>
  <div>
    <v-row class="ma-4 justify-space-between">
      <div id="title">
        <h1>Listes des cours</h1>
      </div>
      <div id="btnAjouterCours">
        <router-link class="text-decoration-none" to="/lesson/new">
          <v-btn style="color: white" color="teal lighten-2"
            >Ajouter un cours
          </v-btn></router-link
        >
      </div>
    </v-row>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <send-message />
      </v-card>
    </v-dialog>
    <div id="table">
      <DataTableLesson
        message
        delete
        :datas="$store.state.lesson.getLessonsTeacherId"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recherche: '',
      open: false,
      dialog: false,
      idTeacher: '0kK1fyyWN8N2bkHNYLoo',
      lesson: [],
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.lesson = await this.$store.dispatch(
        'lesson/getLessonsTeacherId',
        this.idTeacher
      )

      this.lesson.map((lesson) => {
        const timestampEnd = lesson.EndDate.seconds * 1000
        const timestampStart = lesson.startDate.seconds * 1000

        const dateEnd = new Date(timestampEnd)
        const dateStart = new Date(timestampStart)

        let eh = dateEnd.getHours()
        if (eh < 10) {
          eh = '0' + eh
        }
        let em = dateEnd.getMinutes()
        if (em < 10) {
          em = '0' + em
        }

        let sh = dateStart.getHours()
        if (sh < 10) {
          sh = '0' + sh
        }
        let sm = dateStart.getMinutes()
        if (sm < 10) {
          sm = '0' + sm
        }

        lesson.EndDate =
          dateEnd.getDate() +
          '/' +
          (dateEnd.getMonth() + 1) +
          '/' +
          dateEnd.getFullYear() +
          ' ' +
          eh +
          ':' +
          em

        lesson.startDate =
          dateStart.getDate() +
          '/' +
          (dateStart.getMonth() + 1) +
          '/' +
          dateStart.getFullYear() +
          ' ' +
          sh +
          ':' +
          sm

        return lesson
      })
      this.$store.commit('lesson/setLessonsTeacherId', this.lesson)
    },
  },
}
</script>
