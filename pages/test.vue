<template>
  <div>
    <v-row class="ma-4 justify-space-between">
      <div id="title">
        <h1>Listes des cours</h1>
      </div>
      <div id="btnAjouterCours">
        <router-link class="text-decoration-none" to="/lesson/new">
          <v-btn style="color: white" color="teal lighten-2"
            >Ajouter un cours
          </v-btn></router-link
        >
      </div>
    </v-row>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <send-message />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {

}

</script>
