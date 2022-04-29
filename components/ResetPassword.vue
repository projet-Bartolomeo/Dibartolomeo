<template>
  <v-col class="d-flex flex-column align-center" style="width: 30vw">
    <v-form v-model="isFormValid">
      <v-text-field
        v-model="auth.password"
        label="Mot de passe"
        name="password"
        prepend-icon="mdi-lock"
        type="password"
        :rules="passwordRules"
        filled
      ></v-text-field>
      <v-text-field
        v-model="auth.confirmPassword"
        label="Confirmation mot de passe"
        name="confirmPassword"
        prepend-icon="mdi-lock"
        type="password"
        :rules="passwordRules"
        filled
      ></v-text-field>
    </v-form>
    <v-btn
      :disabled="!isFormValid"
      color="#fa3257"
      style="color: white"
      rounded
      depressed
      large
      class="login-button"
      @click="resetPassword"
      >Changer mot de passe</v-btn
    >
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      auth: {
        password: '',
        confirmPassword: '',
      },
      passwordRules: [
        (value) => !!value || 'Entrez un mot de passe',
        (value) => (value && value.length >= 6) || 'Minimum 6 caractère',
      ],
    }
  },

  methods: {
    async resetPassword() {
      if (this.auth.password === this.auth.confirmPassword) {
        await this.$store.dispatch('user/resetPassword', {
          password: this.auth.password,
        })
        this.$store.commit('overlay/close')
      } else {
        this.$store.commit(
          'notification/create',
          {
            description: 'Les mots de passe ne sont pas identiques',
            type: 'error',
          },
          { root: true }
        )
      }
    },
  },
}
</script>