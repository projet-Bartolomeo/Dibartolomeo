<template>
  <!-- <div id="fill-group"> -->
  <v-form>
    <v-row class="justify-space-between ma-5">
      <v-card elevation="6" width="1000px">
        <v-card-title>Finalisation Compte</v-card-title>

        <v-row class="justify-space-between ma-5">
          <v-col md="4">
            <password
    v-model="mot_passe.mot_passeactuel"
    :toggle="true"
    @score="showScore"
    @feedback="showFeedback"
  />
            <v-text-field
              v-model="mot_passe.verif"
              label="Confirmation Mot de passe"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4"> </v-col>
        </v-row>

        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-btn
            id="enregistrer"
            elevation="7"
            color="success"
            width="150px"
            @click="finalisation"
            >Enregistrer</v-btn
          >
        </v-row>
      </v-card>
    </v-row>
  </v-form>
</template>
<script>
 import Password from 'vue-password-strength-meter'

export default {
  components: { Password },
  data() {
    return {
      user: {},
      mot_passe: {
        mot_passeactuel: '',
        verif: '',
      },
    }
  },
  methods: {
     finalisation() {
      
      this.id = this.$route.params.id
      this.$fire.auth.createUserWithEmailAndPassword(
          this.id,
          this.mot_passe.mot_passeactuel
        )
           this.$nuxt.$router.push('/')
  
      
    },
    showFeedback ({suggestions, warning}) {
        console.log('🙏', suggestions)
        console.log('⚠', warning)
      },
      showScore (score) {
        console.log('💯', score)
      }
     
  },
}
</script>
