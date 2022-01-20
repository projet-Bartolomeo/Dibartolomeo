<template>
  <v-app style="background: #f5f5f5">
    <v-navigation-drawer app class="sidebar">
      <side-bar />
    </v-navigation-drawer>
    <v-bottom-navigation class="navebar">
      <Naviguation />
    </v-bottom-navigation>
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
import Naviguation from '~/components/Naviguation.vue'
export default {
  components: { Naviguation },
}
</script>

<style>
.nuxtlink {
  text-decoration: none;
}
.navebar {
  @media (max-width: 900px) {
    display: none;
  }
  @media (min-width: 200px) {
    display: flex;
  }
}
.sidebar {
  @media (min-width: 200px) {
    display: none;
  }
  @media (max-width: 900px) {
    display: flex;
  }
}
</style>
