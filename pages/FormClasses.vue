<template>
  <div>
    <v-row class="justify-space-between ma-5">
      <v-col class="pa-0">
        <h2>Cours de dessin fantastique</h2>
        <p>15/20 élèves</p>
      </v-col>
      <v-btn color="error"> Supprimer le cours</v-btn>
    </v-row>
    <v-col>
      <v-row class="justify-center">
        <v-card width="450" class="ma-6">
          <v-col>
            <v-row class="justify-center align-center">
              <p class="ma-0 pr-10">Récurence :</p>
              <div style="width: 15vw">
                <v-select
                  v-model="selectRec"
                  :items="recurence"
                  item-text="recurence"
                  item-value="recurence"
                ></v-select>
              </div>
            </v-row>
            <v-row class="justify-center align-center">
              <p class="ma-0 pr-10">Age :</p>
              <div style="width: 15vw">
                <v-select
                  v-model="selectAge"
                  :items="Age"
                  item-text="Age"
                  item-value="Age"
                ></v-select>
              </div>
            </v-row>
            <v-row class="justify-center align-center">
              <p class="ma-0 pr-10">Prix :</p>
              <div class="flex-column" style="width: 15vw">
                <v-text-field></v-text-field>
              </div>
              €
            </v-row>
          </v-col>
        </v-card>
        <v-card width="450" class="ma-6 pa-6">
          <v-col>
            <v-row class="justify-space-around align-center">
              <div style="width: 10vw">
                <v-select :items="jour" label="Jour"></v-select>
              </div>
              de
              <div style="width: 5vw">
                <input type="time" />
              </div>
              à
              <div style="width: 5vw">
                <input type="time" />
              </div>
            </v-row>
            <v-row class="justify-space-around align-center">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <div style="width: 10vw">
                    <v-text-field
                      v-model="date"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </div>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              de
              <div style="width: 5vw">
                <input type="time" />
              </div>
              à
              <div style="width: 5vw">
                <input type="time" />
              </div>
            </v-row>
          </v-col>
        </v-card>
      </v-row>
      <v-row class="justify-center">
        <v-card width="450" class="ma-6 pa-4">
          Description
          <v-textarea
            id="Description"
            class="px-6 pt-4"
            cols="10"
            rows="5"
            name="Description"
            filled
            label="Entrez votre description ici"
          ></v-textarea>
        </v-card>
        <v-card width="450" class="ma-6 pa-4">
          Note pour la professeure
          <v-textarea
            id="Note"
            class="px-6 pt-4"
            cols="10"
            rows="5"
            name="Note"
            filled
            label="Entrez votre note ici"
          ></v-textarea>
        </v-card>
      </v-row>
    </v-col>

    <v-row class="ma-0 justify-space-around align-center">
      <v-col class="flex-grow-0">
        <v-btn disabled color="teal lighten-2" @click="open = !open">
          Envoyer message
        </v-btn>
        <v-dialog v-model="open" width="700">
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="open = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
            <Overlay />
          </v-card>
        </v-dialog>
      </v-col>

      <v-col cols="12" sm="4" md="4">
        <v-text-field
          outlined
          dense
          label="Recherche"
          type="text"
          hide-details
        ></v-text-field>
      </v-col>
      <Overlay
        type="text"
        buttonTitle="Ajouter des élèves"
        overlayTitle="Ajouter élève au cours"
      >
        <DatatableStudents />
      </Overlay>
    </v-row>
    <v-col class="mt-5">
      <datatable-students />
    </v-col>
  </div>
</template>
<script>
export default {
  data: () => ({
    open: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    time: null,
    menu2: false,
    modal2: false,
    selectRec: { recurence: 'Unique' },
    selectAge: { Age: 'Jeune' },
    recurence: ['Unique', 'Chaque jour', 'Chaque semaine', 'Chaque mois'],
    Age: ['Jeune', 'Semie', 'Senior'],
    jour: [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
  }),
}
</script>