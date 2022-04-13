<template>
  <div style="margin: 5%">
    <Title value="Listes des cours">
      <router-link class="text-decoration-none" to="/lesson/new">
        <v-btn style="color: white" color="#4EB4EA"
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
