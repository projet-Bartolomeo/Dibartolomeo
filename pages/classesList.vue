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
        :datas="$store.state.lesson.getByTeacherId"
      />
    </div>
  </div>
</template>

<script>
import {convertTimestampToDate} from '../services/DateHelper'
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
        'lesson/getByTeacherId',
        this.idTeacher
      )

      this.lesson.map((lesson) => {
      lesson.EndDate=convertTimestampToDate(lesson.EndDate)
        lesson.startDate=convertTimestampToDate(lesson.startDate)

        return lesson
      })
      this.$store.commit('lesson/setTeacherId', this.lesson)
    },
  },
}
</script>
