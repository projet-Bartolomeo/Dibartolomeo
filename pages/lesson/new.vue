<template>
  <div>
    <v-row class="justify-space-between ma-5">
      <v-col class="pa-0">
        <v-row class="ma-0 align-center">
          Nom du cours :
          <div style="width: 15vw" class="ml-5">
            <v-text-field id="name" v-model="lesson.name"></v-text-field>
          </div>
        </v-row>
        <v-row class="ma-0 align-center">
          <p class="ma-0">0/</p>
          <div
            ref="inputLessonMax"
            class="flex-column ma-0 pl-2"
            style="width: 3vw"
          >
            <v-text-field
              v-model="lesson.maximumStudents"
              class="pa-0 ml-1 input"
            ></v-text-field>
          </div>
          <p class="ma-0 ml-2">élèves</p>
        </v-row>
      </v-col>
      <div class="d-flex flex-column align-center">
        <v-row ref="enregistrer">
          <v-btn @click="createLesson" color="success">Ajouter le cours</v-btn>
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
                ></v-select>
              </div>
            </v-row>
            <v-row class="justify-start align-center mt-7 mb-4 ms-3">
              <p class="ma-0">Prix :</p>
              <div
                ref="inputLessonPrice"
                class="flex-column ma-0 pl-2"
                style="width: 3vw"
              >
                <v-text-field
                  v-model="lesson.price"
                  class="pa-0 input"
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
              v-bind:class="{
                show: isActiveEveryWeekDate,
                hide: !isActiveEveryWeekDate,
              }"
              ref="everyWeekDate"
              class="justify-space-around align-center"
            >
              <div style="width: 10vw">
                <v-select v-model="day" :items="jour" label="Jour"></v-select>
              </div>
              de
              <div style="width: 5vw">
                <input v-model="startHour1" type="time" />
              </div>
              à
              <div style="width: 5vw">
                <input v-model="endHour1" type="time" />
              </div>
            </v-row>
            <v-row
              ref="unique"
              v-bind:class="{ show: isActiveUnique, hide: !isActiveUnique }"
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
                <input v-model="startHour2" type="time" />
              </div>
              à
              <div style="width: 5vw">
                <input v-model="endtHour2" type="time" />
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
      <datatable-students />
    </v-col>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: true,
    hide: true,
    lesson: {
      studentliste: [],
      recurrence: 'Unique',
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
    recurrence: ['Unique', 'Chaque semaine'],
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
    isActiveEveryWeekDate: true,
    isActiveUnique : true,
  }),
  created() {
    this.showDay()
  },
  methods: {
    async createLesson() {
      await this.$store.dispatch('lesson/createLesson', this.lesson)
    },
    showDay() {
      if (this.lesson.recurrence === 'Unique') {
        this.isActiveUnique = true
        this.isActiveEveryWeekDate = false
      }
      else {
        this.isActiveUnique = false
        this.isActiveEveryWeekDate = true
      }
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