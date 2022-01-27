<template>
  <div>
    <Title value="Listes des cours">
      <router-link class="text-decoration-none" to="professor/lesson/new">
        <v-btn style="color: white" color="teal lighten-2"
          >Ajouter un cours
        </v-btn>
      </router-link>
    </Title>
    <DataTableLesson message delete datas="teacherList" />
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch('lesson/setTeacherList', {})
  },
}
</script>
