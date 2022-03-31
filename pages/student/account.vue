<template>
  <div>
    <Title value="Mon compte" />
    <v-col>
      <StudentForm
        datas="details"
        :idstudent="$store.state.user.id"
        redirect="/student/lesson/planning"
        class="ma-5"
      />
    </v-col>
  </div>
</template>

<script>
export default {

  async created() {
    this.$store.dispatch('student/setNew', this.$store.state.user.id)
    
    await this.$store.dispatch(
      'student/setDetails',
      this.$store.state.user.id
    )
  },
}
</script>
