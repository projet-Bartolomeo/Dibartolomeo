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
            v-model="auth.login"
            label="Email"
            name="login"
            prepend-icon="mdi-email"
            type="text"
            :rules="[
              (v) => !!v || 'Veuillez entrer votre email',
              (v) => /.+@.+\..+/.test(v) || 'Le mail n\'est pas valide',
            ]"
            filled
          ></v-text-field>

          <v-text-field
            v-model="auth.password"
            label="Mot de passe"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            :rules="[(v) => !!v || 'Veuillez entrer votre mot de passe']"
            filled
          ></v-text-field>
        </v-form>
      </v-card-text>
      <div class="text-center">
        <v-dialog width="500">
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" rounded v-on="on">Mot de passe oublié</v-btn>
          </template>

          <v-card>
            <v-row class="d-flex justify-center mb-6 align-center mt-5">
              <v-card-title class="red--text text--lighten-1"
                >Mot de passe oublié</v-card-title
              >
            </v-row>
            <v-text-field
              v-model="auth.email_forgot"
              label="email"
              name="email"
              prepend-icon="mdi-email"
              type="email"
            ></v-text-field>
            <v-row class="d-flex justify-center mb-6 align-center mt-5">
              <v-btn
                class="reset-button"
                depressed
                large
                @click="forgotPassword"
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
          depressed
          large
          @click="login"
          >Connexion</v-btn
        >
      </v-row>

      <v-snackbar v-model="snackbar" :timeout="4000" absolute bottom center>
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
        if (this.$store.state.user.connected.type === 'student') {
          this.$router.push('/student/lesson/planning')
        } else {
          this.$router.push('/professor/lesson/planning')
        }
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
