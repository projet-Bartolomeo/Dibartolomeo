<template>
  <div>
    <v-col>
      <StudentForm datas="details"  :idStudent="$store.state.user.idStudent" redirect="/" class="ma-5" />
      <ParticipantForm datas="new"/>
    </v-col>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch('student/setDetails', this.$store.state.user.idStudent)
  },
}
</script>
