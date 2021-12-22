<template>
  <div id="page">
    <ModifEleve />
    <DataTableLesson :datas="$store.state.lesson.getByStudentId" />
    <v-row class="d-flex justify-center mb-6 align-center mt-5">
      <v-btn
        id="enregistrer"
        elevation="7"
        color="success"
        width="150px"
        @click="createUser"
        >Enregistrer</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { user } from '../model/User'
import { converstiondate } from '../services/ConvertDate'
export default {
  data() {
    return {
      studentId: 'YrGucQSEGT9Z0ctUngrX',
      user,
      lesson: [],
    }
  },
  created() {
    this.getUser(this.studentId)
    this.getLesson(this.studentId)
  },
  methods: {
    async getUser(studentId) {
      this.user = await this.$store.dispatch(
        'student/getStudentById',
        studentId
      )
    },
    async getLesson(studentId) {
      this.lesson = await this.$store.dispatch(
        'lesson/getByStudentId',
        studentId
      )
      this.lesson.map((lesson) => {
        this.lesson.startDate = converstiondate(lesson.startDate)
        this.lesson.EndDate = converstiondate(lesson.EndDate)

        return lesson
      })
      this.$store.commit('lesson/setLessonsByStudentId', this.lesson)
    },
    async createUser() {
      const newUser = this.$store.state.user.newUser
      this.$fire.firestore.collection('user').doc(newUser.id).set(newUser.datas)

      await this.$axios.post(
        'https://mailer-dibartolomeo.herokuapp.com/email',
        {
          recipients: [
            {
              email: this.newUser.id,
              name: this.newUser.firstName,
            },
          ],
          subject: 'Finaliser inscription Dibartolomeo',
          content: `<p>bonjour<p><a href='http://localhost:3000/${this.newUser.id}'>Finalisation mot-passe</a></h3><br />,`,
        }
      )
    },
  },
}
</script>

<style>
#page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
