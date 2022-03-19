<template>
  <v-app style="background: #f5f5f5">
    <v-navigation-drawer app>
      <side-bar /> 
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <Overlay />
        <Notification
          v-for="notification in $store.state.notification.list"
          :id="notification.id"
          :key="notification.id"
        />
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<style>
.nuxtlink {
  text-decoration: none;
}
</style>
