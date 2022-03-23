<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
     
         <v-img
            src="/image/logo.png"
            max-height="170"
            max-width="220"
          />
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
              label="Name"
              name="name"
              prepend-icon="mdi-account"
              type="text"
              v-model="NewUser.name"
               filled
            ></v-text-field>
            <v-text-field
              label="Prenom"
              name="firstname"
              prepend-icon="mdi-account"
              type="text"
              v-model="NewUser.firstname"
               filled
            ></v-text-field>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-email"
              type="text"
              v-model="NewUser.email"
               filled
            ></v-text-field>

            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="authenti.password"
               filled
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="authenti.forgot"
               filled
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
        name: '',
        firstname: '',
        emaail: '',
        isRegistered: 'false', 
        isDeleted: 'false'

      
      },
      authenti: {
        mot_pass: '',
        forgot: '',
      },
      uid:'',
    }
  },
  methods: {
    Inscription() {
      this.$fire.auth.createUserWithEmailAndPassword(
        this.NewUser.email,
        this.authenti.password
      ).then((userCredential) => {
     
    this.uid=userCredential.uid
    this.$store.dispatch('user/addUser',this.NewUser)
     this.$nuxt.$router.push('/professor/professor')
   
  })
 
     
    },
  },
}
</script>
