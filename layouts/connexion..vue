<template>
  <v-app style="background: #F5F5F5">
  
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