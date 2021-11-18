<template>
  <!-- <div id="fill-group"> -->
  <v-row class="justify-space-between ma-5">
   
      <v-card elevation="6" width="1000px">
           <v-row class="justify-space-between ma-5">
        <v-col md="4">
          <v-text-field
            v-model="nom"
            :rules="nameRules"
            label="Nom"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field> 
        </v-col>
                <v-col cols="12" md="4">
          <v-text-field
            v-model="prénom"
            :rules="nameRules"
            label="Prénom"
            required
          ></v-text-field>
          <v-text-field
            v-model="téléphone"
            :counter="10"
            label="Téléphone"
            required
          ></v-text-field>
        </v-col>
           </v-row>
      </v-card>
    
    <v-col>
      <v-row class="d-flex justify-end mb-6">
        <v-btn color="teal lighten-2" width="200px" class="white--text"> Envoyer message</v-btn>
      </v-row>
      <v-row class="d-flex justify-end mb-6">
        <v-btn color="error" width="200px"> Supprimer le cours</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>
