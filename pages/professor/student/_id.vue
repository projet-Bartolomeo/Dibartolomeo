<template>
  <div>
    <title value="Création d'un élève" />
    <v-col>
      <StudentForm
        datas="details"
        :idStudent="$route.query.id"
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
    await this.$store.dispatch('student/setDetails', this.$route.query.id)
    await this.$store.dispatch('lesson/setStudentList', this.$route.query.id)
  },
}
</script>
