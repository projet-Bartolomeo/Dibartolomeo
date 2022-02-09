<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card width="500" class="elevation-4 text-left" shaped>
        <v-img
          lazy-src="https://trello.com/1/cards/6160076387267344d2d71b77/attachments/61806466e5b595625772b640/previews/61806466e5b595625772b665/download/Capture_d%E2%80%99%C3%A9cran_2021-11-01_%C3%A0_23.03.58.png"
          max-height="100"
          max-width="150"
          src="https://trello.com/1/cards/6160076387267344d2d71b77/attachments/61806466e5b595625772b640/previews/61806466e5b595625772b665/download/Capture_d%E2%80%99%C3%A9cran_2021-11-01_%C3%A0_23.03.58.png"
        ></v-img>
        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-card-title class="red--text text--lighten-1"
            >Se connecter</v-card-title
          >
        </v-row>
        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-icon @click="googleSignIn"> mdi-google </v-icon>
        </v-row>

        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-email"
              type="text"
              v-model="auth.email"
            ></v-text-field>

            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="auth.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on"> forgot Password </v-btn>
            </template>

            <v-card>
              <v-row class="d-flex justify-center mb-6 align-center mt-5">
                <v-card-title class="red--text text--lighten-1"
                  >forgot Password</v-card-title
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
          <v-btn class="login-button" @click="login" depressed large
            >Login</v-btn
          >
        </v-row>
      </v-card>
      <v-snackbar :timeout="4000" v-model="snackbar" absolute bottom center>
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>

export default {
  layout: 'connexion',
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
     
    }
  },
  methods: {
    async login() {
      this.$fire.auth.signInWithEmailAndPassword(
        this.auth.email,
        this.auth.password
      )

      this.id = this.$fire.getUid(this.auth.email, this.auth.password)
      this.user = await this.$store.dispatch(
        'user/getUserByemail',
        this.auth.email
      )
      this.$nuxt.$router.push('/')
      this.$store.commit('user/set', this.login)
    },
    googleSignIn() {
      const provider = new this.$nuxt.$fireModule.auth.GoogleAuthProvider()
      this.$fire.auth.signInWithPopup(provider).then((user) => {
        this.$nuxt.$router.push('/Calendar')
      })
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
