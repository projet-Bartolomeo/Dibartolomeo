<template>
  <div>
    <v-navigation-drawer
      v-if="authBar === 'register'"
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
                Pour vous inscrire, veuillez entrer vos informations personnels
              </p>
            </v-col>

            <v-col cols="12" align="center">
              <v-btn
                v-if="authBar === 'register'"
                rounded
                outlined
                color="white"
                large
                class="d-flex justify-center align-center"
                @click="initLogin"
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
              Pour vous connecter, veuillez entrer vos informations personnels
            </p>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn rounded outlined color="white" large @click="initRegister"
              >Se connecter</v-btn
            >
          </v-col>
        </v-col>
      </template>
      <v-spacer></v-spacer>
    </v-navigation-drawer>

    <Formlogin v-if="authBar === 'register'" />

    <FormInscription v-else />
  </div>
</template>

<script>
import FormInscription from './FormInscription.vue'
import Formlogin from './Formlogin.vue'
export default {
  layout: 'connect',
  data() {
    return {
      authBar: 'register',

      permanent: true,
    }
  },
  methods: {
    initRegister() {
      this.authBar = 'register'
    },
    initLogin() {
      this.authBar = 'login'
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