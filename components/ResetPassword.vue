<template>
  <v-col class="d-flex flex-column align-center" style="width: 30vw">
    <v-text-field
      label="Mot de passe"
      name="password"
      prepend-icon="mdi-lock"
      type="password"
      :rules="passwordRules"
      v-model="auth.password"
      filled
    ></v-text-field>
    <v-btn
      color="#fa3257"
      style="color: white"
      rounded
      class="login-button"
      @click="resetPassword"
      depressed
      large
      >Changer mot de passe</v-btn
    >
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      auth: {
        password: '',
      },
      passwordRules: [
        (value) => !!value || 'Entrez un mot de passe',
        (value) => (value && value.length >= 6) || 'Minimum 6 caractère',
      ],
    }
  },

  methods: {
    async resetPassword() {
      await this.$store.dispatch('user/resetPassword', {
        password: this.auth.password,
      })
      this.$store.commit('overlay/close')
    },
  },
}
</script>