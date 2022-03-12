<template>
  <div>
    <Title value="Mon compte" />
    <v-col>
      <StudentForm
        datas="details"
        :idStudent="$store.state.user.id"
        redirect="/"
        class="ma-5"
      />
    </v-col>
    <ParticipantList :idStudent="$store.state.user.id" />
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
