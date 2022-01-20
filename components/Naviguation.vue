<template>


<div id="app">
  <v-toolbar
          :color="bar.class"
          :dark="bar.dark"
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title> <v-img
            src="/image/logo.png"
            max-height="170"
            max-width="220"
          /></v-toolbar-title>
          <v-spacer></v-spacer>
         
        </v-toolbar>
  <v-app id="inspire">
    <v-bottom-navigation
      v-model="value"
      background-color="#661723"
      dark
      shift
    >
    <v-list dense nav>
    <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        class="my-5"
      >
       <v-btn>
        <span>{{ item.title }}</span>
  
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
        </v-list-item>
    </v-list>
    

    </v-bottom-navigation>
    
  </v-app>
</div>
    
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: 'Planning', icon: 'mdi-bulletin-board', route: '/' },
        { title: 'Liste des cours', icon: 'mdi-image', route: '/classesList' },
        {
          title: 'Liste des éleves',
          icon: 'mdi-account',
          route: '/studentList',
        },
       /*  { title: 'Administration du site', icon: 'mdi-pencil-box-outline' }, */
      ],
      permanent: true
    }
  },
}
</script>
