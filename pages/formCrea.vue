<template>
<v-container fluid>
        <v-row align="center" >
          <v-col
            cols="12"
            sm="4"
            md="4"
            
          >
          </v-col>
            <v-col
            cols="12"
            sm=""
            md="6"
          >
          </v-col>
           <v-btn
                color="error"
                @click="selectedOpen = false"
              >
                Suprimer
              </v-btn>
      
        </v-row>

        <v-row class="mt-12">
        <v-col
            cols="12"
            sm="4"
            md="4"
          >
          </v-col>
          <v-col
            cols="10"
            sm="4"
            md="2"
          >
           <v-text-field
            label="Nom du cour"
          ></v-text-field>
          </v-col>
         
          <v-col
            cols="12"
            sm="4"
            md="4"
          >
          </v-col>
           <v-col
            cols="12"
            sm="4"
            md="4"
          >
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="2"
          >
          
            <v-select
          :items="recurence"
          label="Recurence"
        ></v-select>
        </v-col>
         <v-col
            cols="24"
            sm="4"
            md="1"
          >
         </v-col>
         <v-col
            cols="12"
            sm="4"
            md="2"
          >
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Horraire"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        
          </v-col>
           <v-col
            cols="24"
            sm="4"
            md="1"
          >
       <v-select
          :items="heure"
          label="Heure de début"
        ></v-select>
        
        </v-col>
          <v-col
            cols="24"
            sm="4"
            md="1"
          >
      <v-select
          :items="heure"
          label="Heure de fin"
        ></v-select>
        
        </v-col>
           <v-col 
            cols="12"
            sm="4"
            md="4"
          >
          </v-col>
           <v-col
            cols="12"
            sm="4"
            md="1"
          >
       <v-select
          :items="Age"
          label="personne"
        ></v-select>
       </v-col>
        <v-col
            cols="12"
            sm="4"
            md="4"
          >
          </v-col>
           <v-col
            cols="24"
            sm="4"
            md="4"
          >
          </v-col>
           <v-col
            cols="12"
            sm="4"
            md="2"
          >
        <v-text-field
            label="Prix"
          ></v-text-field>
        </v-col>
         <v-col
            cols="24"
            sm="4"
            md="1"
          >
          </v-col>
         <v-col
            cols="24"
            sm="5"
            md="1"
          >
       <v-select
          :items="jour"
          label="jour"
        ></v-select>
        
        </v-col>
        <v-col
            cols="24"
            sm="4"
            md="1"
          >
       <v-select
          :items="heure"
          label="Heure de début"
        ></v-select>
        
        </v-col>
          <v-col
            cols="24"
            sm="4"
            md="1"
          >
      <v-select
          :items="heure"
          label="Heure de fin"
        ></v-select>
        
        </v-col>
         <v-col
            cols="12"
            sm="4"
            md="4"
          >
         </v-col>
         <v-col
            cols="12"
            sm="4"
            md="2"
          >
          <v-label>Description</v-label>
        <v-textarea
          filled
          name="input-7-4"
          label="Mesage"
          value="Mesage"
        ></v-textarea>

        </v-col>
         <v-col
            cols="24"
            sm="4"
            md="1"
          >
          </v-col>
         <v-col
            cols="12"
            sm="4"
            md="2"
          >
          <v-label>Notes pour la professeur</v-label>
        <v-textarea
          filled
          name="input-7-4"
          label="Mesage"
          value="Mesage"
        ></v-textarea>

        </v-col>
         <v-col
            cols="24"
            sm="4"
            md="3"
          >
          </v-col>
         <v-col
            cols="12"
            sm="4"
            md="3"
          >
          <v-checkbox
              v-model="ex4"
              label="Tous cocher"
            ></v-checkbox>

        </v-col>
         <v-col
            cols="12"
            sm="4"
            md="3"
          >
          <v-btn>Envoyer un message</v-btn>

        </v-col>
         <v-col
            cols="12"
            sm="3"
            md="3"
          >
             <v-text-field
                  v-model="recherche"
                  label="Recherche"
                  outlined
                  type="text"
                  @keyup="search"
                  @click:clear="clearMessage"
                ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="3"
          >
          <v-btn>Ajouter un éléve</v-btn>

        </v-col>
          <v-col
            cols="12"
            sm="40"
            md="3"
          >
          </v-col>
              <v-col
            cols="12"
            sm="45"
            md="7"
          >
           <DataTableuser />
            </v-col>
             <v-col
            cols="24"
            sm="4"
            md="32"
          >
          </v-col>
         <v-col
            cols="12"
            sm="4"
            md="8"
          >
         <v-btn color="green">Enregistrer</v-btn>

        </v-col>
        </v-row>
      </v-container>
    
</template>
<script>
  export default {
    data: () => ({
      recurence: ['Chaque semaine', 'Chaque jour', 'chaque mois','unique'],
       Age: ['Senior', 'Jeune', 'Semie'],
       heure:['1h', '2h', '3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h'],
        jour:['Lundi', 'mardi', 'Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
    }),
  }
</script>