<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="justify-space-between ma-5">
        <v-col class="pa-0">
          <v-row class="ma-0 align-center">
            Nom du cours :
            <div style="width: 15vw" class="ml-5">
              <v-text-field
                v-model="lesson.name"
                :rules="nameRules"
                required
              ></v-text-field>
            </div>
          </v-row>
          <v-row class="ma-0 align-center">
            <p class="ma-0">0/</p>
            <div
              ref="inputLessonMax"
              class="flex-column ma-0 pl-2"
              style="width: 10vw"
            >
              <v-text-field
                v-model="lesson.maximumStudents"
                type="number"
                class="pa-0 ml-1 input"
                required
                :rules="maxRules"
              ></v-text-field>
            </div>
            <p class="ma-0 ml-2">élèves</p>
          </v-row>
        </v-col>
        <div class="d-flex flex-column align-center">
          <v-row ref="enregistrer">
            <v-btn :disabled="!valid" color="success" @click="createLesson()"
              >Ajouter le cours</v-btn
            >
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
                    :items="recurrence"
                    item-text="recurrence"
                    item-value="recurrence"
                    :rules="[(v) => !!v || 'Une récurrence est obligatoire']"
                    required
                    @change="showDay()"
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
                    :rules="[(v) => !!v || 'L\'age est obligatoire']"
                    required
                  ></v-select>
                </div>
              </v-row>
              <v-row class="justify-start align-center mt-7 mb-4 ms-3">
                <p class="ma-0">Prix :</p>
                <div
                  ref="inputLessonPrice"
                  class="flex-column ma-0 pl-2"
                  style="width: 10vw"
                >
                  <v-text-field
                    v-model="lesson.price"
                    class="pa-0 input"
                    :rules="[(v) => !!v || 'Un prix est obligatoire']"
                    required
                    type="number"
                  ></v-text-field>
                </div>
                €
              </v-row>
            </v-col>
          </v-card>
          <v-card
            style="align-items: center; display: flex"
            width="450"
            class="ma-6 pa-6"
          >
            <v-col>
              <v-row
                v-if="isActiveEveryWeekDate"
                ref="everyWeekDate"
                :v-bind:class="{
                  show: isActiveEveryWeekDate,
                  hide: !isActiveEveryWeekDate,
                }"
                class="justify-space-around align-center"
              >
                <div style="width: 10vw">
                  <v-select
                    v-model="day"
                    :items="jour"
                    label="Jour"
                    :rules="[(v) => !!v || 'Une jour est obligatoire']"
                    required
                  ></v-select>
                </div>
                de
                <div style="width: 5vw">
                  <v-text-field
                    v-model="startHour1"
                    :rules="[
                      (v) => !!v || 'Une heure est obligatoire',
                      rules.max(endHour1, startHour1),
                    ]"
                    type="time"
                    required
                  ></v-text-field>
                </div>
                à
                <div style="width: 5vw">
                  <v-text-field
                    v-model="endHour1"
                    type="time"
                    :rules="[
                      (v) => !!v || 'Une heure est obligatoire',
                      rules.min(startHour1, endHour1),
                    ]"
                    required
                  ></v-text-field>
                </div>
              </v-row>
              <v-row
                v-if="isActiveUnique"
                ref="unique"
                :v-bind:class="{ show: isActiveUnique, hide: !isActiveUnique }"
                class="justify-space-around align-center"
              >
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
                        :rules="[(v) => !!v || 'Un jour est obligatoire']"
                        required
                        v-on="on"
                        @change="geteveryWeekDate()"
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
                  <v-text-field
                    v-model="startHour2"
                    type="time"
                    :rules="[
                      (v) => !!v || 'Une heure est obligatoire',
                      rules.max(endHour2, startHour2),
                    ]"
                    required
                    @change="geteveryWeekDate()"
                  ></v-text-field>
                </div>
                à
                <div style="width: 5vw">
                  <v-text-field
                    v-model="endHour2"
                    type="time"
                    :rules="[
                      (v) => !!v || 'Une heure est obligatoire',
                      rules.min(startHour2, endHour2),
                    ]"
                    required
                    @change="geteveryWeekDate()"
                  ></v-text-field>
                </div>
              </v-row>
            </v-col>
          </v-card>
        </v-row>
        <v-row class="justify-center">
          <v-card width="450" class="ma-6 pa-4">
            <v-row class="align-center pa-3">
              <p class="mb-0">Description du cours</p>
            </v-row>
            <div ref="inputLessonDesc">
              <v-textarea
                id="Description"
                v-model="lesson.descritpion"
                class="px-6 pt-4"
                cols="10"
                rows="5"
                name="Description"
                filled
                label="Entrez votre description ici"
              ></v-textarea>
            </div>
          </v-card>
          <v-card width="450" class="ma-6 pa-4">
            <v-row class="align-center pa-3">
              <p class="mb-0">Note pour la professeure</p>
            </v-row>
            <div ref="inputLessonNote">
              <v-textarea
                id="Note"
                v-model="lesson.teacherNote"
                class="px-6 pt-4"
                cols="10"
                rows="5"
                name="Note"
                filled
                label="Entrez votre note ici"
              ></v-textarea>
            </div>
          </v-card>
        </v-row>
      </v-col>
      <v-col class="mt-5">
        <v-row class="ma-0 justify-space-around align-center">
          <Overlay
            type="text"
            buttonTitle="Ajouter des élèves"
            overlayTitle="Ajouter élèves au cours"
          >
            <DataTableStudent
              add
              :datas="$store.state.student.getAllStudents"
            />
          </Overlay>
        </v-row>
        <v-col class="mt-5">
          <DataTableStudent lesson :datas="$store.state.student.studentList" />
        </v-col>
      </v-col>
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    allUser: [],
    valid: true,
    show: true,
    hide: true,
    lesson: {
      studentliste: [],
      recurrence: 'Unique',
      startDate: '',
      EndDate: '',
      profesor: '0kK1fyyWN8N2bkHNYLoo',
      teacherNote: '',
      descritpion: '',
    },
    endHour2: '',
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
    recurrence: ['Unique', 'Chaque semaine'],
    Age: ['Enfant', 'Adolescent', 'Adulte', 'Senior'],
    jour: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    isActiveEveryWeekDate: true,
    isActiveUnique: true,
    nameRules: [(v) => !!v || 'Le nom est obligatoire'],
    maxRules: [(v) => !!v || "Le nombre d'élève maximal est obligatoire"],
    rules: {
      min(min, v) {
        return (v || '') > min || `L'heure doit être inférieur à l'heure de debut`
      },
      max(max, v) {
        return (v || '') < max || `L'heure doit être supérieur à l'heure de fin`
      },
    },
  }),
  created() {
    this.showDay()
    this.fetchData()
  },
  methods: {
    async createLesson() {
      this.$store.state.student.studentList.map((studentList) => {
        return this.lesson.studentliste.push(studentList.id)
      })

      function AddTime(d, j) {
        return new Date(d.getTime() + 1000 * 3600 * 24 * j)
      }

      if (this.$refs.form.validate()) {
        if (this.isActiveEveryWeekDate) {
          const startHours = this.startHour1.split(':')
          const endHours = this.endHour1.split(':')

          let ladateS = new Date()
          let ladateE = new Date()

          ladateS.setHours(startHours[0], startHours[1])
          ladateE.setHours(endHours[0], endHours[1])

          for (let i = 0; i < 20; i++) {
            ladateS = AddTime(ladateS, 1)
            ladateE = AddTime(ladateE, 1)

            if (ladateS.getDay() === this.jour.indexOf(this.day)) {
              this.lesson.startDate = ladateS
              this.lesson.EndDate = ladateE
              await this.$store.dispatch('lesson/createLesson', this.lesson)
            }
          }
        } else {
          await this.$store.dispatch('lesson/createLesson', this.lesson)
        }
      }
    },
    showDay() {
      if (this.lesson.recurrence === 'Unique') {
        this.isActiveUnique = true
        this.isActiveEveryWeekDate = false
      } else {
        this.isActiveUnique = false
        this.isActiveEveryWeekDate = true
      }
    },

    geteveryWeekDate() {
      this.lesson.startDate = new Date(this.date + 'T' + this.startHour2)

      this.lesson.EndDate = new Date(this.date + 'T' + this.endHour2)
    },

    async fetchData() {
      this.allUser = await this.$store.dispatch('student/getAllStudents')
      this.$store.commit('student/setAllStudents', this.allUser)
    },
  },
}
</script>

<style>
.hide {
  display: none;
}
.show {
  display: flex;
  margin-bottom: 0 !important;
}
.input input {
  padding: 0;
  margin-top: 19px;
}
</style>