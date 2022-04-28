<template>
  <v-app style="background: #fafafa">
   
    <SideBar />
    
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
