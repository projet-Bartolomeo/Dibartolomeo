<template>
  <div id="page">
    <ModifEleve />
    <DataTableLesson :datas="$store.state.lesson.getLessonsByStudentId" />
    <v-row class="d-flex justify-center mb-6 align-center mt-5">
      <v-btn id="enregistrer" elevation="7" color="success" width="150px"
        >Enregistrer</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { user } from '../model/User'
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
        'lesson/getLessonsByStudentId',
        studentId
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
      this.$store.commit('lesson/setLessonsByStudentId', this.lesson)
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
