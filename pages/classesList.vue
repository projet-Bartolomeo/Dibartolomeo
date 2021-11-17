<template>
  <div>
    <v-row class="my-4 justify-space-between">
      <div id="title"><h1>Listes des cours</h1></div>
      <div id="btnAjouterCours">
        <router-link class="text-decoration-none" to="/formClasses">
          <v-btn  style="color: white" color="teal lighten-2">Ajouter un cours </v-btn></router-link
        >
      </div>
    </v-row>

    <v-row class="ma-0 justify-center align-center">
      <v-col cols="12" sm="4" md="4">
        <v-btn disabled  style="color: white" color="teal lighten-2" @click="open = !open">
          Envoyer message
        </v-btn>
        <v-dialog v-model="open" width="700">
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="open = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
            <send-message />
          </v-card>
        </v-dialog>
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
    <div id="table">
      <DataTableClasses />
    </div>
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
  }
}
</script>

<style>
#flex {
  padding-top: 3em;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

#flex :first-child {
  align-self: end;
}

#title {
  padding-left: 2em;
}

#btnAjouterCours {
  padding-right: 2em;
  padding-bottom: 2em;
}

#sendMail {
  padding-left: 3em;
  padding-top: 7px;
}

.btnMail {
  background-color: rgb(173, 173, 173);
  color: #5a5a5a;
  text-align: center;
  font-size: 15px;
  padding: 5px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  cursor: pointer;
}

.btnCours {
  background-color: blue;
  color: #eeee;
  text-align: center;
  font-size: 15px;
  padding: 5px;
  width: 120px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  cursor: pointer;
}

#table {
  margin: 4px;
  border-radius: 4px;
}
</style>
