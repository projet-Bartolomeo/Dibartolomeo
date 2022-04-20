<template>
  <v-card color="lighten-4" min-width="350px" flat>
    <v-card flat>
      <v-col>
        <v-card class="d-flex justify-space-around pa-5">
          <div class="d-flex">
            <div class="pa-2">
              <p class="ma-0 pr-3">Récurrence</p>
            </div>
            <div
              class="mr-3 pa-2 ma-0"
              style="background: #f7f7f7; height: fit-content"
            >
              <p class="ma-0">{{ recurrence }}</p>
            </div>
          </div>
          <div class="d-flex">
            <div class="pa-2">
              <p class="ma-0 pr-3">Age</p>
            </div>
            <div
              class="mr-3 pa-2 ma-0"
              style="background: #f7f7f7; height: fit-content"
            >
              <p class="ma-0">{{ ageRange }}</p>
            </div>
          </div>
          <div class="d-flex">
            <div class="pa-2">
              <p class="ma-0 pr-3">Prix</p>
            </div>
            <div
              class="mr-3 pa-2 ma-0"
              style="background: #f7f7f7; height: fit-content"
            >
              <p class="ma-0">{{ lesson.price }} €</p>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col>
        <DataTableStudent
          v-if="userType === 'professor'"
          datas="fromLesson"
          message
          lesson
        />

        <v-card
          v-else
          class="d-flex justify-space-around justify-center py-5 ml-5 mr-5"
        >
          {{ lesson.description || 'Pas de description' }}
        </v-card>
      </v-col>
      <div v-if="userType === 'student'" class="w-100 d-flex justify-center">
        <SubscribeButton v-if="!isRegister" :lesson="lesson" />
        <UnsubscribeButton v-else :lesson="lesson" />
      </div>
      <v-row
        v-if="userType === 'professor'"
        class="ma-0 d-flex justify-space-around align-center pb-4"
      >
        <router-link
          class="text-decoration-none"
          :to="`/professor/lesson/${lesson.id}`"
        >
          <v-btn
            class="my-5"
            style="color: white"
            color="#76d9a3"
            @click="$store.commit('overlay/close')"
          >
            Modifier le cours
          </v-btn>
        </router-link>
        <v-btn
          color="error"
          @click="
            $store.commit('overlay/open', {
              component: 'LessonModificationForm',
              props: {
                lesson,
                archive: true,
                redirectPath: '',
              },
              title: 'Voulez-vous archiver ce cours',
            })
          "
        >
          Supprimer le cours
        </v-btn>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import { Recurrence } from '../enums/Recurrence'
import { Age } from '../enums/Age'
export default {
  computed: {
    lesson() {
      return { ...this.$store.state.lesson.details }
    },
    userType() {
      return this.$store.state.user.type
    },
    isRegister() {
      const studentIds = this.$store.state.lesson.details.studentIds
      return studentIds && studentIds.includes(this.$store.state.user.id)
    },
    recurrence() {
      return Recurrence[this.lesson.recurrence]
    },
    ageRange() {
      return Age[this.lesson.ageRange]
    }
  },
}
</script>
