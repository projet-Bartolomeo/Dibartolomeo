<template>
<div v-if="affichage===1">
  <v-navigation-drawer

    width="500"
    app
  left
    style="background: linear-gradient(90deg, rgba(108,20,36,1) 18%, rgba(91,16,29,1) 91%);"

  >
    <template #prepend>
     
        <v-row class="mt-5 justify-center align-center" >
            <v-col>
            <v-img
            src="/image/logo.png"
            max-height="170"
            max-width="220"
          />
          </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <h1 v-if="affichage===1">Inscris toi </h1>
           </v-col> 
           <v-col>
          <v-btn v-if="affichage===1" @click="init2">S'inscrire</v-btn>
           </v-col>
          
         
          
          
         
          </v-row>
     
    </template>
    <v-spacer></v-spacer>
   
  </v-navigation-drawer>


    
      <Formlogin v-if="affichage===1"/>
     
      <FormInscripiton v-else  />

   

  </div>
  <div v-else>
  <v-navigation-drawer
    app
  right
    style="background: linear-gradient(90deg, rgba(108,20,36,1) 18%, rgba(91,16,29,1) 91%);"
     
    width="500"

  >
    <template #prepend>
      <v-list-item>
        <v-list-item-content>
        <v-row class="mt-5 justify-center align-center" >
            <v-img
            src="/image/logo.png"
            max-height="170"
            max-width="220"
          />
        <v-spacer></v-spacer>
          <h1 v-if="affichage===1">Inscris toi </h1>
          <v-btn v-if="affichage===1" @click="init2"></v-btn>
          
              
          <v-btn  @click="init" v-else>Se connecter</v-btn>
          
         
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-spacer></v-spacer>
   
  </v-navigation-drawer>

<transition name="fade" mode="out-in">
    
      <Formlogin v-if="affichage===1" mode="out"/>
     
      <FormInscripiton v-else mode="in" />
</transition>
   

  </div>
</template>

<script>
import FormInscripiton from './FormInscripiton.vue'
import Formlogin from './Formlogin.vue'
export default {
  components: { Formlogin, FormInscripiton },
  layout:'connexion_inscription',
  data() {
    return {
        affichage:'1',
      items: [
        { title: 'Planning', icon: 'mdi-bulletin-board', route: '/' },
        { title: 'Liste des cours', icon: 'mdi-image', route: '/lesson/list' },
        {
          title: 'Liste des éleves',
          icon: 'mdi-account',
          route: '/student/list',
        },
       /*  { title: 'Administration du site', icon: 'mdi-pencil-box-outline' }, */
      ],
      permanent: true
    }
  },
  methods:{
      init(){
          this.affichage=1;
      },
       init2(){
          this.affichage=2;
      }

  },
}
</script>
