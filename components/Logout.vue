<template>
  <v-btn depressed color="#fa3257" style="width: 12vw" class="ma-2 white--text" @click="logout">
    Déconnexion
    <v-icon class="ml-2"> mdi-logout </v-icon>
  </v-btn>
</template>
<script>

export default {
  methods: {
    logout() {
      this.$store.commit('user/logout')
      this.$router.push('/')
    }
  },
}
</script>
