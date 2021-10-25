<template>
    <v-navigation-drawer
      absolute
      permanent
      left
       style="background : #122132;"
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
             <v-list-item-title  style="color:white">
              Di Bartolomeo
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
    <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon style="color:white">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content style="color:white">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Planning', icon: 'mdi-bulletin-board' },
        { title: 'Liste des cours', icon: 'mdi-image' },
        { title: 'Liste des éleves', icon: 'mdi-account' },
        { title: 'Administration du site', icon: 'mdi-pencil-box-outline' }
      ]
    }
  }
}
</script>