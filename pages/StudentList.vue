<template>
  <div>
    <v-row class="ma-4 justify-space-between">
      <h1>Listes des élèves</h1>
      <router-link class="text-decoration-none" to="/AddModifStudent">
        <v-btn style="color: white" color="teal lighten-2"
          >Ajouter un élève</v-btn
        ></router-link
      >
    </v-row>
    <DataTableStudent message :datas="$store.state.student.getByTeacherId" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      recherche: '',
      open: false,
      dialog: false,
      user : [],
      idTeacher : '0kK1fyyWN8N2bkHNYLoo'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.user = await this.$store.dispatch('student/getByTeacherId' , this.idTeacher)
      this.$store.commit('student/setStudentByTeacherId', this.user)
    },
  },
}
</script>
