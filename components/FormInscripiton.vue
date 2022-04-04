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
            v-model="NewUser.firstName"
            :rules="[(v) => !!v || 'Veuiller entrer votre Nom']"
            prepend-icon="mdi-account"
            type="text"
            filled
          ></v-text-field>
          <v-text-field
            label="Prenom"
            name="firstname"
            v-model="NewUser.lastName"
            :rules="[(v) => !!v || 'Veuiller entrer votre prenom']"
            prepend-icon="mdi-account"
            type="text"
            filled
          ></v-text-field>
          <v-text-field
            label="Email"
            name="login"
            v-model="NewUser.email"
            :rules="[
              (v) => !!v || 'Veuiller entrer votre email',
              (v) => /.+@.+\..+/.test(v) || 'Le mail n\'est pas valide',
            ]"
            prepend-icon="mdi-email"
            type="text"
            filled
          ></v-text-field>

          <v-text-field
            label="Mot de passe"
            name="password"
v-model="authenti.mot_pass"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
            type="password"
            filled
          ></v-text-field>
          <v-text-field
            label="Confirmation du mot de passe"
            v-model="authenti.confirm"
           :rules="[(v) => !!v || 'Veuiller entrer votre mot de passe']"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
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
      passwordRules: [
        (value) => !!value || 'Please type password.',
        (value) => (value && value.length >= 6) || 'minimum 6 characters',
      ],
      NewUser: {
        lastName: '',
        firstName: '',
        isRegistered: 'false',
        isDeleted: 'false',
        email:'',
      },
      authenti: {
        mot_pass: '',
        confirm: '',
      },
      uid:'',
    }
  },
  
  methods: {
    Inscription() {
    if(this.authenti.mot_pass=== this.authenti.confirm){
      this.$fire.auth
        .createUserWithEmailAndPassword(
          this.NewUser.email,
          this.authenti.mot_pass
        )
        .then((user) => {
          this.uid = user.uid;
          this.$store.dispatch('user/addUser',{NewUser,uid})
          this.$store.dispatch('user/getuserbyid', this.uid)
          this.$nuxt.$router.push('/professor/professor')
        })
    }
    },
  },
}
</script>
