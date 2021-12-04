<template>
  <div>
    <v-row class="justify-space-between ma-5">
      <v-col class="pa-0">
        <v-row class="ma-0 align-center">
          <h2 ref="paraLessonTilte">
            {{ lesson.name }}
          </h2>
          <div
            ref="inputLessonTilte"
            class="flex-column hide"
            style="width: 15vw"
          >
            <v-text-field
              id="name"
              v-model="lesson.name"
              @change="ShowSave()"
            ></v-text-field>
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
        <v-row  class="ma-0 align-center">
          <p class="ma-0">{{lesson.studentliste.length}}/</p>
          <p ref="paraLessonMax" class="ma-0">{{ lesson.maximumStudents }}</p>
          <div
            ref="inputLessonMax"
            class="flex-column hide ma-0 pl-2"
            style="width: 2vw"
          >
            <v-text-field
              v-model="lesson.maximumStudents"
              class="pa-0 ml-1 input"
              @change="ShowSave()"
            ></v-text-field>
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
          <v-btn @click="createLesson" color="success">Enregistrer le cours</v-btn>
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
                  v-model="lesson.recurrence"
                  :items="recurence"
                  item-text="recurence"
                  item-value="recurence"
                  @change="ShowSave()"
                ></v-select>
              </div>
            </v-row>
            <v-row class="justify-start align-center ms-3">
              <p class="ma-0 pr-10">Age :</p>
              <div style="width: 15vw">
                <v-select
                  v-model="lesson.ageRange"
                  :items="Age"
                  item-text="Age"
                  item-value="Age"
                  @change="ShowSave()"
                ></v-select>
              </div>
            </v-row>
            <v-row class="justify-start align-center mt-7 mb-4 ms-3">
              <p class="ma-0 pr-10">Prix :</p>
              <div
                ref="inputLessonPrice"
                class="flex-column hide ma-0 pl-2"
                style="width: 2vw"
              >
                <v-text-field
                  v-model="lesson.price"
                  class="pa-0 input"
                  @change="ShowSave()"
                ></v-text-field>
              </div>
              <p ref="paraLessonPrice" class="ma-0">{{lesson.price}}</p>
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
                <v-select
                  v-model="day"
                  :items="jour"
                  label="Jour"
                  @change="ShowSave()"
                ></v-select>
              </div>
              de
              <div style="width: 5vw">
                <input v-model="startHour1" type="time" @change="ShowSave()" />
              </div>
              à
              <div style="width: 5vw">
                <input v-model="endHour1" type="time" @change="ShowSave()" />
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
                <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
                  @change="ShowSave()"
                >
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
                <input v-model="startHour2" type="time" @change="ShowSave()" />
              </div>
              à
              <div style="width: 5vw">
                <input v-model="endtHour2" type="time" @change="ShowSave()" />
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
          <div ref="inputLessonDesc" class="hide">
            <v-textarea
              id="Description"
              v-model="lesson.descritpion"
              class="px-6 pt-4"
              cols="10"
              rows="5"
              name="Description"
              filled
              label="Entrez votre description ici"
              @change="ShowSave()"
            ></v-textarea>
          </div>

          <p ref="paraLessonDesc" class="px-6 pt-4">
           {{lesson.descritpion}}
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
          <div ref="inputLessonNote" class="hide">
            <v-textarea
              id="Note"
              v-model="lesson.teacherNote"
              class="px-6 pt-"
              cols="10"
              rows="5"
              name="Note"
              filled
              label="Entrez votre note ici"
              @change="ShowSave()"
            ></v-textarea>
          </div>
          <p ref="paraLessonNote" class="px-6 pt-4">
          {{lesson.teacherNote}}
          </p>
        </v-card>
      </v-row>
    </v-col>

    <v-col class="mt-5">
      <datatable-students />
    </v-col>
  </div>
</template>
<script>
export default {
  data: () => ({
    lesson: {
      studentliste: [],
    },
    endtHour2: '',
    startHour2: '',
    endHour1: '',
    startHour1: '',
    day: '',
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    time: null,
    menu2: false,
    modal2: false,
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
  }),
  created() {
    this.getLesson()
  },

  methods: {
    HideShow(idHide, idShow, iconHide, iconShow) {
      idHide.className = 'hide'
      idShow.className = 'show'
      iconHide.className = 'hide'
      iconShow.className = 'show'
    },

    ShowSave() {
      this.$refs.enregistrer.className = 'show'
      console.log('test' + this.endtHour2)
},
    async createLesson() {
      await this.$store.dispatch('lesson/createLesson', this.lesson)
    },
    async getLesson() {
      this.lesson = await this.$store.dispatch(
        'lesson/getLessonById',
        this.$route.query.id
      )
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

.input input {
  padding: 0;
  margin-top: 19px;
}
</style>