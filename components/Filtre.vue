<template>
<v-card elevation="5">
  <v-row class="ma-0 pa-3">
  <div class="Filtre">
     <TextField :open='true' get='lesson.studentListFilter.search' placeholder='Entrez le nom de votre cours' width="50"/>
  </div>
  </v-row>
  </v-card>
</template>
<script>
export default {}
</script>