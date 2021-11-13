<template>
  <v-navigation-drawer absolute permanent left style="background: #621321">
    <template v-slot:prepend>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-center" style="color: white">
            Di Bartolomeo
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-spacer></v-spacer>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title"  :to="item.route" class="my-5">
        <v-list-item-icon>
          <v-icon style="color: white">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content style="color: white">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Planning', icon: 'mdi-bulletin-board', route: '/' },
        { title: 'Liste des cours', icon: 'mdi-image' , route: '/classesList' },
        { title: 'Liste des éleves', icon: 'mdi-account', route: '/StudentList'},
        { title: 'Administration du site', icon: 'mdi-pencil-box-outline' },
      ],
    }
  },
}
</script>