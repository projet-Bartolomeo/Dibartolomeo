<template>
<v-card elevation="5" class="filter">
  <v-row class="ma-0 pa-3">
     <TextField :open='true' get='lesson.studentListFilter.search' placeholder='Entrez le nom de votre cours' width="50"/>
  </v-row>
  </v-card>
</template>
