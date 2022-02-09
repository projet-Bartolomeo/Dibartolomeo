<template>
  <div>
    <v-col>
      <StudentForm
        datas="details"
        :idStudent="$store.state.user.idStudent"
        redirect="/"
        class="ma-5"
      />
      <ParticipantForm datas="new" />
    </v-col>
    <ParticipantList />
  </div>
</template>

<script>
export default {
   data() {
    return {
      participant : [],
    }
  },
  async created() {
    this.$store.dispatch('student/setNew', this.$store.state.user.idStudent)

    await this.$store.dispatch(
      'student/setDetails',
      this.$store.state.user.idStudent
    )
  },
}
</script>
