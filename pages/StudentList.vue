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
    <div>
      <v-row class="ma-0 my-10 justify-center align-center">
        <v-col cols="12" sm="4" md="4">
          <Overlay
            type="text"
            buttonTitle="Envoyer un message"
            overlayTitle="Envoyer un message"
          >
            <v-col class="d-flex flex-column align-center">
              <v-textarea
                class="text-area"
                filled
                auto-grow
                name="input-7-4"
                label="Entrez votre message ici"
                style="width: 30vw"
              ></v-textarea>
              <v-btn style="color: white" color="teal lighten-2">Envoyer</v-btn>
            </v-col>
          </Overlay>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-text-field
            outlined
            dense
            v-model="recherche"
            label="Recherche"
            type="text"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <DatatableStudents />
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