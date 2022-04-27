<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-row class="d-flex justify-center mb-6 align-center mt-5">
        <v-card-title class="red--text text--lighten-1"
          >Se connecter</v-card-title
        >
      </v-row>

      <v-card-text>
        <v-form>
          <v-text-field
            label="Email"
            name="login"
            prepend-icon="mdi-email"
            type="text"
            v-model="auth.login"
            :rules="[
              (v) => !!v || 'Veuillez entrer votre email',
              (v) => /.+@.+\..+/.test(v) || 'Le mail n\'est pas valide',
            ]"
            filled
          ></v-text-field>

          <v-text-field
            label="Mot de passe"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="auth.password"
            :rules="[(v) => !!v || 'Veuillez entrer votre mot de passe']"
            filled
          ></v-text-field>
        </v-form>
      </v-card-text>
      <div class="text-center">
        <v-dialog width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" rounded>Mot de passe oublié</v-btn>
          </template>

          <v-card>
            <v-row class="d-flex justify-center mb-6 align-center mt-5">
              <v-card-title class="red--text text--lighten-1"
                >Mot de passe oublié</v-card-title
              >
            </v-row>
            <v-text-field
              label="email"
              name="email"
              prepend-icon="mdi-email"
              type="email"
              v-model="auth.email_forgot"
            ></v-text-field>
            <v-row class="d-flex justify-center mb-6 align-center mt-5">
              <v-btn
                class="reset-button"
                @click="forgotPassword"
                depressed
                large
                >Envoie du lien</v-btn
              >
            </v-row>
          </v-card>
        </v-dialog>
      </div>

      <v-row class="d-flex justify-center mb-6 align-center mt-5">
        <v-btn
          color="#fa3257"
          style="color: white"
          rounded
          class="login-button"
          @click="login"
          depressed
          large
          >Connexion</v-btn
        >
      </v-row>

      <v-snackbar :timeout="4000" v-model="snackbar" absolute bottom center>
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'connexion_inscription',
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      id: '',
      auth: {
        email: '',
        password: '',
        email_forgot: '',
      },
      uid: '',
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('user/login', {
        email: this.auth.login,
        password: this.auth.password,
      })

      if (this.$store.state.user.connected.id) {
        this.$router.push('/student/lesson/planning')
      }
    },
    forgotPassword() {
      this.$fire.auth
        .sendPasswordResetEmail(this.auth.email_forgot)
        .then(function () {
          this.snackbarText = 'reset link sent to ' + this.auth.email_forgot
          this.snackbar = true
        })
        .catch(function (error) {
          this.snackbarText = error.message
          this.snackbar = true
        })
    },
  },
}
</script>
