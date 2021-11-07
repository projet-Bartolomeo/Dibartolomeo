<template>
  <v-app>
  <v-navigation-drawer app>
    <side-bar />
  </v-navigation-drawer>
  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>
</v-app>
</template>


<script>

export default {
  data () {
    return {
      right: true,
      rightDrawer: false,
    }
  },
}
</script>
