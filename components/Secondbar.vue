<template>
  <div>
    <v-navigation-drawer
      width="500"
      max-height="170"
      app
      right
      style="background: #ce1b52"
      v-if="affichage === 1"
    >
      <template #prepend>
        <v-list-item>
          <v-list-item-content>
            <v-img src="/image/logo.png" max-height="170" max-width="220" />
          </v-list-item-content>
        </v-list-item>
        <div class="container">
          <v-col cols="12" align="center">
            <h1
              style="color: white"
              class="d-flex justify-center mb-6 align-center mt-5"
            >
              Inscris toi
            </h1>
          </v-col>
          <v-col cols="12" sm="4" md="4" align="center"> </v-col>
          <v-col cols="12" align="center">
            <p
              style="color: white"
              class="d-flex justify-center mb-6 align-center mt-5"
            >
              Pour vous inscrit veuiller entrer vos informations personnels
            </p>
          </v-col>

          <v-col cols="12" sm="" md="4" align="center"> </v-col>

          <v-col cols="12" align="center">
            <v-btn
              v-if="affichage === 1"
              rounded
              @click="init2"
              class="d-flex justify-center mb-6 align-center mt-5"
              >S'inscrire</v-btn
            >
          </v-col>
        </div>
      </template>
    </v-navigation-drawer>
    <v-navigation-drawer
      width="500"
      max-height="170"
      app
      left
      style="background: #ce1b52"
      v-else
    >
      <template #prepend>
        <v-list-item>
          <v-list-item-content>
            <v-img src="/image/logo.png" max-height="170" max-width="220" />
          </v-list-item-content>
        </v-list-item>

        <v-col cols="12" align="center">
          <h1
            style="color: white"
            class="d-flex justify-center mb-6 align-center mt-5"
          >
            Content de te revoir
          </h1>
        </v-col>
        <v-col cols="4" sm="3" md="4" align="center"> </v-col>
        <v-col cols="12" align="center">
          <p
            class="
              font-weight-medium
              d-flex
              justify-center
              mb-6
              align-center
              mt-5
            "
            style="color: white"
          >
            Pour vous connecter veuiller entrer vos informations personnels
          </p>
        </v-col>

        <v-col cols="12" sm="8" md="4" align="center"> </v-col>

        <v-col cols="12" align="center">
          <v-btn rounded @click="init">Se connecter</v-btn>
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