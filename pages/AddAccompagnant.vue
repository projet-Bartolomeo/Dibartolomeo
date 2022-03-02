<template>
  <div>
    <v-col>
      <Selectparticipant :participants="$store.state.user.participants" />
      <Liste :lesson="$store.state.lesson.details" />
      <!-- <v-btn elevation="6" color="success" @click="addParticipants = !addParticipants" 
        >+ Ajouter participants</v-btn
      >
      <div>
        <v-row  v-if="addParticipants == true">
            <v-text-field
              label="Nom"
              :rules="rules"
              hide-details="auto"
              style="margin: 50px"
            ></v-text-field>
            <v-text-field label="Prénom" style="margin: 50px"></v-text-field>
            <v-btn elevation="6">Ajouter</v-btn>
        </v-row>
      </div> -->
    </v-col>
      <v-btn
        id="btn"
        elevation="6"
        color="light-green accent-4"
        @click="addParticipants =  addaccompagnant"
        >S'inscrire</v-btn
      >
  
  </div>
  
</template>

<script>
export default {
  
  data() {
    return {
      addParticipants: false,
    }
  },
  created() {
    this.$store.dispatch('lesson/setDetails', {
      lessonId: '0kaKEfN52KAwhh4nBf6n',
    })
    this.$store.dispatch('user/recupuser')
  },
  methode:{
    addaccompagnant(){
      this.$store.commit('lesson/addacompagnant')

      
    }
  }

}
</script>
