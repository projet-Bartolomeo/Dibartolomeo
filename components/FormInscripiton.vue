<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
     
        <v-img
          lazy-src="https://trello.com/1/cards/6160076387267344d2d71b77/attachments/61806466e5b595625772b640/previews/61806466e5b595625772b665/download/Capture_d%E2%80%99%C3%A9cran_2021-11-01_%C3%A0_23.03.58.png"
          max-height="100"
          max-width="150"
          src="https://trello.com/1/cards/6160076387267344d2d71b77/attachments/61806466e5b595625772b640/previews/61806466e5b595625772b665/download/Capture_d%E2%80%99%C3%A9cran_2021-11-01_%C3%A0_23.03.58.png"
        ></v-img>
        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-card-title class="red--text text--lighten-1"
            >Créer un Compte</v-card-title
          >
        </v-row>
        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-icon @click="googleSignIn"> mdi-google </v-icon>
        </v-row>

        <v-card-text>
          <v-form>
            <v-text-field
              label="Nom"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              v-model="NewUser.nom"
            ></v-text-field>
            <v-text-field
              label="Prenom"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              v-model="NewUser.Prenom"
            ></v-text-field>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-email"
              type="text"
              v-model="authenti.email"
            ></v-text-field>

            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="NewUser.password"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="authenti.forgot"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-btn
            class="login-button"
            @click="Inscription"
            depressed
            large
            color="error"
            >S'inscrire</v-btn
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
  layout: 'connexion',
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      id: '',
      NewUser: {
        nom: '',
        prenom: '',
        uid:'',
      },
      authenti: {
        login: '',
        mot_pass: '',
        forgot: '',
      },
    }
  },
  methods: {
    Inscription() {
      this.$fire.auth.createUserWithEmailAndPassword(
        this.auth.email,
        this.auth.password
      ).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
       this.$store.dispatch('user/adduser'+this.NewUser)
    },
  },
}
</script>
