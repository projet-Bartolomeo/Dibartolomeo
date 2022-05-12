<template>
  <v-btn depressed color="error" style="width: 12vw" class="ma-2" @click="logout">
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
