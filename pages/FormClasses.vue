<template>
  <div>
    <v-row class="justify-space-between ma-5">
      <v-col class="pa-0">
        <v-row class="ma-0 align-center">
          <h2 ref="paraLessonTilte">{{ lesson.name }}</h2>
          <div
            class="flex-column hide"
            ref="inputLessonTilte"
            style="width: 15vw"
          >
            <v-text-field @change="test()"></v-text-field>
          </div>
          <div ref="pensilLessonTilte">
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="
                HideShow(
                  $refs.paraLessonTilte,
                  $refs.inputLessonTilte,
                  $refs.pensilLessonTilte,
                  $refs.closeLessonTilte
                )
              "
            >
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
          </div>
          <div ref="closeLessonTilte" class="hide">
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="
                HideShow(
                  $refs.inputLessonTilte,
                  $refs.paraLessonTilte,
                  $refs.closeLessonTilte,
                  $refs.pensilLessonTilte
                )
              "
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </div>
        </v-row>
        <v-row class="ma-0 align-center">
          <p class="ma-0">15/</p>
          <p class="ma-0" ref="paraLessonMax">20</p>
          <div
            class="flex-column hide ma-0 pl-2"
            ref="inputLessonMax"
            style="width: 2vw"
          >
            <v-text-field class="pa-0"></v-text-field>
          </div>
          <p class="ma-0 ml-2">élèves</p>
          <div ref="pensilLessonMax">
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="
                HideShow(
                  $refs.paraLessonMax,
                  $refs.inputLessonMax,
                  $refs.pensilLessonMax,
                  $refs.closeLessonMax
                )
              "
            >
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
          </div>
          <div ref="closeLessonMax" class="hide">
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="
                HideShow(
                  $refs.inputLessonMax,
                  $refs.paraLessonMax,
                  $refs.closeLessonMax,
                  $refs.pensilLessonMax
                )
              "
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-col>
      <div class="d-flex flex-column align-center">
        <v-row> <v-btn color="error">Supprimer le cours</v-btn> </v-row>
        <v-row ref="enregistrer" class="hide">
          <v-btn color="success">Enregistrer le cours</v-btn>
        </v-row>
      </div>
    </v-row>
    <v-col>
      <v-row class="justify-center">
        <v-card width="450" class="ma-6">
          <v-col>
            <v-row class="justify-start align-center ms-3">
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
            <v-row class="justify-start align-center ms-3">
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
            <v-row class="justify-start align-center mt-7 mb-4 ms-3">
              <p class="ma-0 pr-10">Prix :</p>
              <div
                class="flex-column hide ma-0 pl-2"
                ref="inputLessonPrice"
                style="width: 2vw"
              >
                <v-text-field class="pa-0"></v-text-field>
              </div>
              <p class="ma-0" ref="paraLessonPrice">20</p>
              €
              <div ref="pensilLessonPrice">
                <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="
                    HideShow(
                      $refs.paraLessonPrice,
                      $refs.inputLessonPrice,
                      $refs.pensilLessonPrice,
                      $refs.closeLessonPrice
                    )
                  "
                >
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
              </div>
              <div ref="closeLessonPrice" class="hide">
                <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="
                    HideShow(
                      $refs.inputLessonPrice,
                      $refs.paraLessonPrice,
                      $refs.closeLessonPrice,
                      $refs.pensilLessonPrice
                    )
                  "
                >
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </div>
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
                <template v-slot:activator="{ on, attrs }">
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
          <v-row class="align-center pa-3">
            <p class="mb-0">Description du cours</p>
            <div ref="pensilLessonDesc">
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="
                  HideShow(
                    $refs.paraLessonDesc,
                    $refs.inputLessonDesc,
                    $refs.pensilLessonDesc,
                    $refs.closeLessonDesc
                  )
                "
              >
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div ref="closeLessonDesc" class="hide">
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="
                  HideShow(
                    $refs.inputLessonDesc,
                    $refs.paraLessonDesc,
                    $refs.closeLessonDesc,
                    $refs.pensilLessonDesc
                  )
                "
              >
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </div>
          </v-row>
          <div class="hide" ref="inputLessonDesc">
            <v-textarea
              id="Description"
              class="px-6 pt-4"
              cols="10"
              rows="5"
              name="Description"
              filled
              label="Entrez votre description ici"
            ></v-textarea>
          </div>

          <p ref="paraLessonDesc" class="px-6 pt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            excepturi placeat blanditiis distinctio accusamus cupiditate labore
            quas magnam repellat! Voluptatum inventore, aspernatur voluptatem
            vitae nihil enim? Fugit accusantium facere nostrum!
          </p>
        </v-card>
        <v-card width="450" class="ma-6 pa-4">
          <v-row class="align-center pa-3">
            <p class="mb-0">Note pour la professeure</p>
            <div ref="pensilLessonNote">
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="
                  HideShow(
                    $refs.paraLessonNote,
                    $refs.inputLessonNote,
                    $refs.pensilLessonNote,
                    $refs.closeLessonNote
                  )
                "
              >
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
            </div>
            <div ref="closeLessonNote" class="hide">
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="
                  HideShow(
                    $refs.inputLessonNote,
                    $refs.paraLessonNote,
                    $refs.closeLessonNote,
                    $refs.pensilLessonNote
                  )
                "
              >
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </div>
          </v-row>
          <div class="hide" ref="inputLessonNote">
            <v-textarea
              id="Note"
              class="px-6 pt-"
              cols="10"
              rows="5"
              name="Note"
              filled
              label="Entrez votre note ici"
            ></v-textarea>
          </div>
          <p ref="paraLessonNote" class="px-6 pt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
            excepturi placeat blanditiis distinctio accusamus cupiditate labore
            quas magnam repellat! Voluptatum inventore, aspernatur voluptatem
            vitae nihil enim? Fugit accusantium facere nostrum!
          </p>
        </v-card>
      </v-row>
    </v-col>

    <v-row class="ma-0 justify-space-around align-center">
      <v-col class="flex-grow-0">
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
        overlayTitle="Ajouter élèves au cours"
      >
        <DatatableStudents />

        <v-col class="d-flex flex-column align-center mt-7">
          <v-btn style="color: white" color="teal lighten-2"
            >Ajouter au cours</v-btn
          >
        </v-col>
      </Overlay>
    </v-row>
    <v-col class="mt-5">
      <datatable-students />
    </v-col>
    <v-btn @click="createLesson">create lesson</v-btn>
  </div>
</template>
<script>
export default {
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    time: null,
    menu2: false,
    modal2: false,
    selectRec: { recurence: 'Unique' },
    selectAge: { Age: 'Enfant' },
    recurence: ['Unique', 'Chaque semaine'],
    Age: ['Enfant', 'Adolescent', 'Adulte', 'Senior'],
    jour: [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
    lesson: {},
  }),
  created() {
    this.lesson = this.$store.state.lesson
  },

  methods: {
    HideShow(idHide, idShow, iconHide, iconShow) {
      idHide.className = 'hide'
      idShow.className = 'show'
      iconHide.className = 'hide'
      iconShow.className = 'show'
    },
    test(){
      this.$refs.enregistrer.className = 'show'
    },
    async createLesson() {
      await this.$store.dispatch('lesson/createLesson', this.lesson)
    },
  },
}
</script>

<style>
.hide {
  display: none;
}

.show {
  display: block;
  margin-bottom: 0 !important;
}

#input-31,
#input-131,
#input-151,
#input-51 {
  padding: 0;
  margin-top: 17px;
}
</style>