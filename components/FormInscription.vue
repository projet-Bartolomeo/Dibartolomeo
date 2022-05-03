<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-row class="d-flex justify-center mb-6 align-center mt-5">
        <v-card-title class="text--lighten-1" style="color: #fa3257"
          >Créer un compte</v-card-title
        >
      </v-row>

      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            v-model="NewUser.firstName"
            label="Nom"
            name="name"
            :rules="[(v) => !!v || 'Veuillez entrer votre nom']"
            prepend-icon="mdi-account"
            type="text"
            filled
            required
          >
          </v-text-field>
          <v-text-field
            v-model="NewUser.lastName"
            label="Prenom"
            name="firstname"
            :rules="[(v) => !!v || 'Veuillez entrer votre prénom']"
            prepend-icon="mdi-account"
            type="text"
            filled
            required
          ></v-text-field>
          <v-text-field
            v-model="NewUser.email"
            label="Email"
            name="login"
            :rules="[
              (v) => !!v || 'Veuillez entrer votre email',
              (v) => /.+@.+\..+/.test(v) || 'Le mail n\'est pas valide',
            ]"
            prepend-icon="mdi-email"
            type="text"
            filled
            required
          ></v-text-field>

          <v-text-field
            v-model="authenti.mot_pass"
            label="Mot de passe"
            name="password"
            prepend-icon="mdi-lock"
            :rules="passwordRules"
            type="password"
            filled
            required
          ></v-text-field>
          <v-text-field
            v-model="authenti.confirm"
            label="Confirmation du mot de passe"
            :rules="passwordConfirmationRules"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            filled
            required
          >
          </v-text-field>
        </v-form>
      </v-card-text>

      <v-row class="d-flex justify-center mb-6 align-center mt-5">
        <v-btn
          :disabled="!isFormValid"
          depressed
          rounded
          large
          color="#fa3257"
          style="color: white"
          @click="Inscription"
        >
          S'inscrire</v-btn
        >
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'connexion',
  data() {
    return {
      isFormValid: false,
      passwordRules: [
        (value) => !!value || 'Veuillez entrer votre mot de passe.',
        (value) => (value && value.length >= 6) || 'Minimum 6 caractères',
      ],
      passwordConfirmationRules: [
        (value) => !!value || 'Veuillez entrer votre mot de passe.',
        (value) =>
          value === this.authenti.mot_pass ||
          'Les mots de passe ne correspondent pas',
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
