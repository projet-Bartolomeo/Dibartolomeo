<template>
  <!-- <div id="fill-group"> -->
  <v-form>
    <v-row class="justify-space-between ma-5">
      <v-card elevation="6" width="1000px">
        <v-row class="justify-space-between ma-5">
          <v-col md="4">
            <v-text-field
              v-model="newUser.firstName"
              label="Nom"
              name="nom"
            ></v-text-field>

            <v-text-field
              v-model="email"
              name="email"
              label="E-mail"
              type="mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" justify-center>
            <v-text-field
              v-model="newUser.lastName"
              name="prenom"
              label="Prénom"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-row class="d-flex justify-center mb-6 align-center mt-5">
        <v-btn @click="addStudent"></v-btn>
      </v-row>
    </v-row>
  </v-form>
</template>
<script>

export default {
  data() {
    return {
      open: false,
      Messages: '',
      newUser: {
        firstName: '',
        lastName: '',
        type: 'student',
        banned: 'false',
      },
      email:'',
      nombre:'',
      url:'',
    }
  },

  methods: {
    async addStudent() {
      this.nombre = await this.$store.dispatch(
        'user/Countemail',
        this.email)
        if(this.nombre==='0'){
           
      await this.$fire.firestore.collection('user').doc(this.email).set(this.newUser);
      

      await this.$axios.post('https://mailer-dibartolomeo.herokuapp.com/email',
    {
   "recipients": [
        {
            "email": this.email,
            "name": this.newUser.firstName
        },
      
    ],
    "subject": "Finalisation Inscription",
    "content": `<p>bonjour<p><a href='${this.email}'>Finalisation mot-passe</a></h3><br />,`
}

);

        }else{
      
        console.log('impsible')
        }
    },
  },
}
</script>
