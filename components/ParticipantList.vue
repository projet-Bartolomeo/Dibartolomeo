<template>
  <div>
    <h3>Les participants additionel</h3>
    <v-card>
      <v-list-item
        three-line
        v-for=" (participant, index) in $store.state.student.participant"
        :key="participant"
      >
            <ParticipantForm datas="participant" :index="index" />
        {{ participant.firstName }}
        {{ participant.lastName }}
        <v-icon class="mr-1" @click="$store.dispatch('student/removeFromTeacher', {
        student: participant,
      }) , fetchData()"> mdi-delete </v-icon>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      participant: [],
    }
  },
  methods: {
    async fetchData() {
      this.participant = await this.$store.dispatch(
        'student/setParticipant',
        this.$store.state.user.idStudent
      )
    },
  },
  created() {
    this.fetchData()
  },
}
</script>
