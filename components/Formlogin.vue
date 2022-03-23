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
            v-model="auth.email"
            filled
          ></v-text-field>

          <v-text-field
            label="Mot de passe"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="auth.password"
            filled
          ></v-text-field>
        </v-form>
      </v-card-text>
      <div class="text-center">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" rounded> Mot passe oublier </v-btn>
          </template>

          <v-card>
            <v-row class="d-flex justify-center mb-6 align-center mt-5">
              <v-card-title class="red--text text--lighten-1"
                >Mot passe oublier</v-card-title
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
        <v-btn  rounded class="login-button" @click="login" depressed large>Connexion</v-btn>
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
      uid:'',
    }
  },
  methods: {
    login() {
      this.$fire.auth.signInWithEmailAndPassword(
        this.auth.email,
        this.auth.password
      ).then((userCredential) => {
     
    this.uid=userCredential.uid

     
       this.$store.dispatch(
        'user/getuserbyid',
        this.uid
      )
      
      this.$nuxt.$router.push('/student/lesson/planning')
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
