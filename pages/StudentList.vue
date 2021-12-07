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
    <DataTableStudent message/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recherche: '',
      open: false,
      dialog: false,
    }
  },
}
</script>