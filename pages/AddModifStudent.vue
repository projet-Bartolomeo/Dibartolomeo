<template>
  <div id="page">
    <ModifEleve />
    <DataTableClasses />
      <v-row class="d-flex justify-center mb-6 align-center mt-5">
      <v-btn 
        id="enregistrer"
        elevation="7"
        color = success
        width="150px"
      >Enregistrer</v-btn>
      </v-row>
  </div>
</template>

<script>
import {user} from '../model/User'
export default {
  data() {
    return {
      studentID: 'df28MA9DGqmgJKirnXhi',
      user,
    }
  },
  created() {
    this.getUser(this.studentID)
  },
  methods: {
    async getUser(studentID) {
      this.user = await this.$store.dispatch('student/getStudentById',studentID)
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