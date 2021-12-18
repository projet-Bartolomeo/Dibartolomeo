<template>
  <v-row class="justify-space-between mb-12 mx-5 mt-5 align-center">
    <v-card elevation="6" width="55vw">
      <v-row class="justify-space-between ma-5">
        <v-col md="4">
          <v-text-field
            v-model="user.lastname"
            label="Nom"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.firstname"
            label="Prénom"
            required
          ></v-text-field>
          <v-switch v-model="user.banned" inset label="banni"></v-switch>
        </v-col>
      </v-row>
    </v-card>

    <v-col>
      <v-row class="d-flex justify-end mb-6">
        <v-btn
          style="color: white"
          color="blue darken-1"
          @click="
            $store.commit('overlay/open', {
              component: 'MessageForm',
              props: { recipients: [user.id], type: 'student' },
              title: 'Tapez votre message',
            })
          "
          >send message</v-btn
        >
      </v-row>
      <v-row class="d-flex justify-end mb-6">
        <v-btn color="error" width="200px"> Supprimer l'élève </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      recherche: '',
      open: false,
      dialog: false,
      studentID: 'YrGucQSEGT9Z0ctUngrX',
      user: {},
    }
  },
  created() {
    this.getUser(this.studentID)
  },
  methods: {
    async getUser(studentID) {
      this.user = await this.$store.dispatch(
        'student/getStudentById',
        studentID
      )
    },
  },
}
</script>