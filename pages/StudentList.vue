<template>
<div>
<v-row class="ma-4 justify-space-between">
    <h1>Listes des élèves</h1>
    <v-btn color="teal lighten-2" style="color:white">
                Ajouter un élève
          
              </v-btn>
  </v-row>
    <div>
        <v-app id="inspire">
            <v-row class="ma-4 justify-space-around">
            <v-col cols="12" sm="4" md="4">
                        <v-btn 
                        color="teal lighten-2" style="color:white"
                depressed
                disabled>
              Envoyer un message
                </v-btn>
            </v-col>
           <v-col cols="12" sm="4" md="4">
                        <v-text-field
            
            label="Recherche"
            outlined>
            </v-text-field>
            </v-col>
            </v-row>
            
        </v-app>
    </div>
    </div>
</template>

<script>
export default {
    
}
</script>