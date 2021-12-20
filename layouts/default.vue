<template>
  <v-app style="background: #f5f5f5">
    <v-navigation-drawer app>
      <side-bar />
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <Overlay />
        <Notification />
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      right: true,
      rightDrawer: false,
    }
  },
  errorCaptured(err) {
    this.$store.commit('notification/open', {
      description: err,
      type: 'error',
    })
    return false
  },
}
</script>

<style>
.nuxtlink {
  text-decoration: none;
}
</style>
