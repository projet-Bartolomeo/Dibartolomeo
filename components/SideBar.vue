<template>
  <v-navigation-drawer app left class="navigation-drawer-color">
    <template #prepend>
      <v-list-item>
        <v-list-item-content>
          <v-row class="mt-5 justify-center align-center">
            <v-img src="/image/logo.png" max-height="170" max-width="220" />
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-spacer></v-spacer>
    <v-list dense nav>
      <v-list-item
        v-for="item in routeList"
        :key="item.title"
        :to="item.route"
        class="my-5"
      >
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
import { UserType } from '../enums/UserType'
export default {
  data() {
    return {
      items: [
        {
          title: 'Planning',
          icon: 'mdi-bulletin-board',
          route: '/professor',
          type: UserType.professor
        },
        {
          title: 'Liste des cours',
          icon: 'mdi-image',
          route: '/professor/lesson/list',
          type: UserType.professor
        },
        {
          title: 'Liste des éleves',
          icon: 'mdi-account',
          route: '/professor/student/list',
          type: UserType.professor
        },
        {
          title: 'Liste de mes cours',
          icon: 'mdi-image',
          route: '/student/lesson/list',
          type: UserType.student
        }
      ],
      permanent: true
    }
  },
  computed: {
    routeList() {
      return this.items.filter(item => this.$store.state.user.type === item.type)
    }
  }
}
</script>

<style>
.navigation-drawer-color {
  background: linear-gradient(
    90deg,
    rgba(108, 20, 36, 1) 18%,
    rgba(91, 16, 29, 1) 91%
  );
}
</style>