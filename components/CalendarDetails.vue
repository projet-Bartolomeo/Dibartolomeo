<template>
  <v-card color="lighten-4" min-width="350px" flat>
    <v-row class="ma-0">
      <v-col cols="12" sm="6">
        <div>{{ lesson.title }}</div>
        <p>
          {{ lesson.studentIds.length }} / {{ lesson.maximumStudents }} élèves
        </p>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>

    <v-card flat>
      <v-col>
        <v-card class="d-flex justify-space-around pt-5 px-5 ml-5 mr-5">
          <div class="d-flex">
            <p class="ma-0 pr-3">Récurrence :</p>
            <p>{{ lesson.recurrenceValue }}</p>
          </div>
          <div class="d-flex">
            <p class="ma-0 pr-3">Age :</p>
            <p>{{ lesson.ageRange }}</p>
          </div>
          <div class="d-flex">
            <p class="ma-0 pr-3">Prix :</p>
            <p>{{ lesson.price }}</p>
            €
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
        class="ma-0 d-flex justify-center align-center pb-4"
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
      const lesson = { ...this.$store.state.lesson.details }
      lesson.recurrenceValue = Recurrence[lesson.recurrence]
      lesson.ageRange = Age[lesson.ageRange]
      return lesson
    },
    userType() {
      return this.$store.state.user.type
    },
    isRegister() {
      const studentIds = this.$store.state.lesson.details.studentIds
      return studentIds && studentIds.includes(this.$store.state.user.id)
    }
  }
}
</script>
