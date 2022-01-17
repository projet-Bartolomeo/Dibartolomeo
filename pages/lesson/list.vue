<template>
  <div>
    <Title value="Listes des cours">
      <router-link class="text-decoration-none" to="/lesson/new">
        <v-btn style="color: white" color="teal lighten-2"
          >Ajouter un cours
        </v-btn>
      </router-link>
    </Title>
    <center>
    <DataTableLesson message delete datas="teacherList" />
    </center>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch('lesson/setTeacherList', {})
  },
}
</script>
