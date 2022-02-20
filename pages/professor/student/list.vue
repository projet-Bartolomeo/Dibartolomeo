<template>
  <div>
    <Title value="Liste des cours">
      <router-link class="text-decoration-none" to="/professor/student/new">
        <v-btn style="color: white" color="teal lighten-2"
          >Ajouter un élève</v-btn
        ></router-link
      >
    </Title>
    <DataTableStudent message datas="teacherList" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      recherche: '',
      open: false,
      dialog: false,
      user: [],
      idTeacher: '0kK1fyyWN8N2bkHNYLoo',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.user = await this.$store.dispatch(
        'student/setTeacherList',
        this.idTeacher
      )
    },
  },
}
</script>
