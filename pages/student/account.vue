<template>
  <div>
    <Title value="Mon compte" />
    <v-col>
      <StudentForm
        datas="details"
        :idStudent="$store.state.user.idStudent"
        redirect="/"
        class="ma-5"
      />
    </v-col>
    <ParticipantList :idStudent="$store.state.user.idStudent" />
  </div>
</template>

<script>
export default {

  async created() {
    this.$store.dispatch('student/setNew', this.$store.state.user.idStudent)
    
    await this.$store.dispatch(
      'student/setDetails',
      this.$store.state.user.idStudent
    )
  },
}
</script>
