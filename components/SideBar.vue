<template>
  <v-navigation-drawer app left color="#ce1b52">
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
      <div v-for="item in routeList" :key="item.title" class="my-10 d-flex justify-center">
        <NuxtLink class="text-decoration-none" :to="item.route">
          <v-btn class="buttonSideBar" color="white" elevation="1" outlined rounded>{{ item.title }}</v-btn>
        </NuxtLink>
      </div>
      <div v-if="$store.state.user.connected.type === 'professor'" class="my-10 d-flex justify-center">
        <v-btn class="buttonSideBar" color="white" elevation="1" outlined rounded @click="logout">Déconnexion</v-btn>
      </div>
    </v-list>
    <template #append>
      <div class="d-flex justify-center flex-wrap pb-12 px-12">
        <a class="nuxtlink" href="https://www.pagesjaunes.fr/pros/08713989">A propos
        </a>

        <div class="mx-1 white--text">|</div>

        <NuxtLink class="nuxtlink" to="/politics/term-of-service">CGU
        </NuxtLink>

        <div class="mx-1 white--text">|</div>

        <NuxtLink class="nuxtlink" to="/politics/data-protection-policy">Politique de confidentialité</NuxtLink>

        <div class="mx-1 white--text">|</div>

        <NuxtLink class="nuxtlink" to="/politics/legal-notice">Mention légale</NuxtLink>
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
          title: 'Mes cours',
          route: '/student/lesson/list',
          type: UserType.student,
        },
      ],

      permanent: true,
    }
  },
  methods: {
    logout() {
      this.$store.commit('user/logout')
      this.$router.push('/')
    }
  },
  computed: {
    routeList() {
      return this.items.filter(
        (item) => this.$store.state.user.connected.type === item.type
      )
    },
  },
}
</script>

<style>
.nuxtlink {
  font-size: 11px;
  text-decoration: none;
  color: white !important;
  display: flex;
  align-items: center;
}

.buttonSideBar {
  width: 11vw;
}

@media (min-width: 1600px) {
  .buttonSideBar {
    width: 9vw;
    min-width: 600px;
  }
}

@media (max-width: 1300px) {
  .buttonSideBar {
    width: 16vw;
  }
}
</style>
