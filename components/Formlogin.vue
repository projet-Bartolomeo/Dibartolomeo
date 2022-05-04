<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-row class="d-flex justify-center mb-6 align-center mt-5">
        <v-card-title class="text--lighten-1" style="color: #fa3257"
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
        <v-btn
          rounded
          @click="
            $store.commit('overlay/open', {
              component: 'ForgetPassord',
              title: 'Mot de passe oublié',
            })
          "
          >Mot de passe oublié</v-btn
        >
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'connexion_inscription',
  data() {
    return {
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
      
      const isConnected = this.$store.state.user.connected.id

      if (isConnected) {
        this.$router.push(
          `/${this.$store.state.user.connected.type}/lesson/planning`
        )
      }
    },
  },
}
</script>
