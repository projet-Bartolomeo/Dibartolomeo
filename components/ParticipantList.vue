<template>
  <div>
    <h3>Les participants additionel</h3>
    <v-card>
      <v-list-item
        three-line
        v-for="paticipant in $store.state.student.paticipant"
        :key="paticipant"
      >
        {{ paticipant.firstName }}
        {{ paticipant.lastName }}
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
