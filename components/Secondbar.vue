<template>
  <div>
    <v-navigation-drawer
      v-if="affichage === 1"
      width="500"
      max-height="170"
      app
      right
      style="background: #ce1b52"
    >
      <template #prepend>
        <v-list-item>
          <v-list-item-content>
            <v-img src="/image/logo.png" max-height="170" max-width="220" />
          </v-list-item-content>
        </v-list-item>
        <div class="container">
          <v-spacer style="height: 7vw"></v-spacer>
          <v-col cols="12" align="center">
            <v-col cols="12" align="center">
              <h1
                style="color: white"
                class="d-flex justify-center align-center"
              >
                Inscrivez-vous
              </h1>
            </v-col>
            <v-col cols="12" align="center">
              <p
                style="color: white"
                class="d-flex justify-center align-center"
              >
                Pour vous inscrire veuillez entrer vos informations personnels
              </p>
            </v-col>

            <v-col cols="12" align="center">
              <v-btn
                v-if="affichage === 1"
                rounded
                outlined
                color="white"
                large
                class="d-flex justify-center align-center"
                @click="init2"
                >S'inscrire</v-btn
              >
            </v-col>
          </v-col>
        </div>
      </template>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-else
      width="500"
      max-height="170"
      app
      left
      style="background: #ce1b52"
    >
      <template #prepend>
        <v-list-item>
          <v-list-item-content>
            <v-img src="/image/logo.png" max-height="170" max-width="220" />
          </v-list-item-content>
        </v-list-item>
        <v-spacer style="height: 7vw"></v-spacer>
        <v-col cols="12" align="center">
          <v-col cols="12" align="center">
            <h1 style="color: white" class="d-flex justify-center align-center">
              Content de vous revoir
            </h1>
          </v-col>
          <v-col cols="12" align="center">
            <p
              class="font-weight-medium d-flex justify-center align-center"
              style="color: white"
            >
              Pour vous connecter veuillez entrer vos informations personnels
            </p>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn rounded outlined color="white" large @click="init"
              >Se connecter</v-btn
            >
          </v-col>
        </v-col>
      </template>
      <v-spacer></v-spacer>
    </v-navigation-drawer>

    <Formlogin v-if="affichage === 1" />

    <FormInscription v-else />
  </div>
</template>

<script>
import FormInscription from './FormInscription.vue'
import Formlogin from './Formlogin.vue'
export default {
  components: { Formlogin, FormInscription },
  layout: 'connexion_inscription',
  data() {
    return {
      affichage: '1',

      permanent: true,
    }
  },
  methods: {
    init() {
      this.affichage = 1
    },
    init2() {
      this.affichage = 2
    },
  },
}
</script>
<style>
.container {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
</style>