<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card width="500" class="elevation-4 text-left" shaped>
        <v-card-title>Login</v-card-title>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="auth.email"
              label="Login"
              name="login"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>

            <v-text-field
              v-model="auth.password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn depressed large class="login-button" @click="login"
            >Login</v-btn
          >
          <v-btn class="login-button" depressed large @click="googleSignIn"
            >Google</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="snackbar" :timeout="4000"  absolute bottom center>
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      const that = this
      this.$fire.auth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)

        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
        })
        .then((user) => {})
    },
    googleSignIn() {
      const that = this
      const provider = this.$fire.$firemodule.auth.GoogleAuthProvider()
      this.$fire.auth
        .signInWithPopup(provider)
        .catch(function (error) {
          that.snackbarText = error.message
          that.snackbar = true
        })
        .then((user) => {})
    },
  },
}
</script>
