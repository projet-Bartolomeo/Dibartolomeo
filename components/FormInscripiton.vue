<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
     
      
        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-card-title class="red--text text--lighten-1"
            >Créer un Compte</v-card-title
          >
        </v-row>
        
      <v-card-text>
          <v-form>
            <v-text-field
              label="Nom"
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
              label="email"
              name="login"
              prepend-icon="mdi-email"
              type="text"
              v-model="NewUser.email"
               filled
            ></v-text-field>

            <v-text-field
              label="Mot de passe"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="authenti.password"
               filled
            ></v-text-field>
            <v-text-field
              label="Confirmation du mot de passe"
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
      if(this.NewUser.name===""){
      this.$fire.auth.createUserWithEmailAndPassword(
        this.NewUser.email,
        this.authenti.password
      ).then((userCredential) => {
     
    this.uid=userCredential.uid
    this.$store.dispatch('user/addUser',this.NewUser)
     this.$nuxt.$router.push('http://localhost:3000/student/lesson/planning')
   
  })
  }else{
    this.$fire.auth.createUserWithEmailAndPassword(
        this.NewUser.email,
        this.authenti.password
      ).then((userCredential) => {
     
    this.uid=userCredential.uid
    this.$store.dispatch('user/addUser',this.NewUser)
     this.$nuxt.$router.push('http://localhost:3000/student/lesson/planning')
   
  })


  }
 
     
    },
  },
}
</script>
