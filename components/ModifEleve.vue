<template>
  <!-- <div id="fill-group"> -->
  <v-row class="justify-space-between mb-12 mx-5 mt-5 align-center">
    <v-card elevation="6" width="55vw">
      <v-row class="justify-space-between ma-5">
        <v-col md="4">
          <v-text-field
            @change="setNewUser"
            v-model="newUser.firstName"
            label="Nom"
            name="nom"
          
          ></v-text-field>

          <v-text-field
            @change="setNewUser"
            v-model="newUser.email"
            name="email"
            label="E-mail"
            type="mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" justify-center>
          <v-text-field
            @change="setNewUser"
            v-model="newUser.lastName"
            name="prenom"
            label="Prénom"
            required
          ></v-text-field>
          <v-switch inset label="banni"></v-switch>
        </v-col>
      </v-row>
    </v-card>

    <v-col>
      <v-row class="d-flex justify-end mb-6">
        <Overlay
          type="text"
          buttonTitle="Envoyer un message"
          overlayTitle="Envoyer un message"
        >
          <v-col class="d-flex flex-column align-center">
            <v-textarea
              class="text-area"
              filled
              auto-grow
              name="input-7-4"
              label="Entrez votre message ici"
              style="width: 30vw"
            ></v-textarea>
            <v-btn style="color: white" color="teal lighten-2">Envoyer</v-btn>
          </v-col>
        </Overlay>
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
      newUser: {
        firstName: '',
        lastName: '',
        type: 'student',
        banned: 'false',
        email:'',
      },
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
    setNewUser(){
      this.$store.commit('user/setNewUser',this.newUser)
    }
  },
}
</script>