<template>
  <v-card elevation="5">
    <v-row class="ma-0 pa-3 justify-space-between">
      <TextField
        :open="true"
        get="lesson.studentListFilter.search"
        placeholder="Entrez le nom de votre cours"
        width="50"
      />

      <IntervalDateFilter
        getend="lesson.studentListFilter.endDate"
        getstart="lesson.studentListFilter.startDate"
      ></IntervalDateFilter>
    </v-row>
  </v-card>
</template>
<script>
export default {}
</script>
