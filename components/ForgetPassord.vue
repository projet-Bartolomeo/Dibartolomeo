<template>
  <v-col class="d-flex flex-column align-center" style="width: 30vw">
    <v-form v-model="isFormValid">
      <v-text-field
        v-model="auth.email_forgot"
        label="email"
        name="email"
        :rules="[
          (v) => !!v || 'Veuillez entrer votre email',
          (v) => /.+@.+\..+/.test(v) || 'Le mail n\'est pas valide',
        ]"
        prepend-icon="mdi-email"
        type="email"
      ></v-text-field>
    </v-form>
    <v-row class="d-flex justify-center mb-6 align-center mt-5">
      <v-btn
        :disabled="!isFormValid"
        color="#fa3257"
        style="color: white"
        rounded
        class="login-button"
        depressed
        @click="forgotPassword"
        >Envoie du lien</v-btn
      >
    </v-row>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      auth: {
        email_forgot: '',
      },
    }
  },
  methods: {
    async forgotPassword() {
      await this.$store.dispatch('user/forgotPassword', {
        email: this.auth.email_forgot,
      })
      this.$store.commit('overlay/close')
    },
  },
}
</script>
