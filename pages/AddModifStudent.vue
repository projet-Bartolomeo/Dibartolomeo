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
