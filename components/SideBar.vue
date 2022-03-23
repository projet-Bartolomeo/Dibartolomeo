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
      <div
        v-for="item in routeList"
        :key="item.title"
        class="my-10 d-flex justify-center"
      >
        <router-link class="text-decoration-none" :to="item.route">
          <v-btn class="buttonSideBar" color="white" elevation="7" outlined rounded>{{
            item.title
          }}</v-btn>
        </router-link>
      </div>
    </v-list>
    <template #append>
      <div class="d-flex justify-center flex-wrap" style="color: white">
        <router-link class="text-decoration-none" color="white" to="/"
          ><p style="font-size: 11px; color: white" class="px-3 ma-0">
            A propos
          </p>
        </router-link>
        <router-link class="text-decoration-none" color="white" to="/"
          ><p style="font-size: 11px; color: white" class="px-3">
            CGU
          </p> </router-link
        ><router-link class="text-decoration-none" color="white" to="/"
          ><p style="font-size: 11px; color: white" class="px-3">
            Politique de confidentialité
          </p> </router-link
        ><router-link class="text-decoration-none" color="white" to="/"
          ><p style="font-size: 11px; color: white" class="px-3">
            Mention légale
          </p>
        </router-link>
      </div>
    </template>
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
          route: '/professor/lesson/planning',
          type: UserType.professor,
        },
        {
          title: 'Liste des cours',
          route: '/professor/lesson/list',
          type: UserType.professor,
        },
        {
          title: 'Liste des éleves',
          route: '/professor/student/list',
          type: UserType.professor,
        },
        {
          title: 'Planning',
          route: '/student/lesson/planning',
          type: UserType.student,
        },
        {
          title: 'Mon compte',
          route: '/student/account',
          type: UserType.student,
        },
        {
          title: 'Liste de mes cours',
          route: '/student/lesson/list',
          type: UserType.student,
        },
      ],

      permanent: true,
    }
  },
  computed: {
    routeList() {
      return this.items.filter(
        (item) => this.$store.state.user.type === item.type
      )
    },
  },
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

.buttonSideBar{
  width: 14vw;
}

@media (min-width: 1600px) {

.buttonSideBar{
  width: 11vw;
}

}

@media (max-width: 1300px) {

.buttonSideBar{
  width: 16vw;
}

}

</style>
