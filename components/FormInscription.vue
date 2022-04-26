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

            :rules="passwordConfirmationRules" name="password" prepend-icon="mdi-lock"
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
      passwordConfirmationRules: [
        (value) => !!value || 'Please type password.',
        (value) => (value === this.authenti.mot_pass) || 'les mots de passes ne correspondent pas',
      ],
      NewUser: {
        lastName: '',
        firstName: '',
        isRegistered: 'false',
        isDeleted: 'false',
        type: 'student',
        email: '',
      },
      authenti: {
        mot_pass: '',
        confirm: '',
      },
      uid: '',
    }
  },

  methods: {
    async Inscription() {
      await this.$store.dispatch('user/register', {
        newUser: this.NewUser,
        password: this.authenti.confirm,
      })
      this.$router.push('/student/lesson/planning')
    },
  },
}
</script>
