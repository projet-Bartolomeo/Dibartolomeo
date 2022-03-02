<template>
  <div>
    <Title value="Création d'un élève" />
    <v-col class="justify-center">
      <StudentForm datas="new" class="mt-10" />
    </v-col>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('student/setNew')
  },
}
</script>
