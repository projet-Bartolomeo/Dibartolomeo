<template>
  <div>
    <Title value="Profil élève" />
    <v-col>
      <StudentForm
        datas="details"
        :idstudent="$route.params.id"
        redirect="/professor/student/list"
        class="ma-5"
      />
      <DataTableLesson datas="studentList" />
    </v-col>
  </div>
</template>

<script>
export default {
  async created() {
    this.$store.dispatch('student/setNew')
    await this.$store.dispatch('student/setDetails', this.$route.params.id)
    await this.$store.dispatch('lesson/setStudentList', { studentId: this.$route.params.id })
  },
}
</script>
