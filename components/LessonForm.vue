<template>
  <div>
    <v-form v-model="valid">
      <v-row class="justify-space-between ma-5">
        <v-col class="pa-0">
          <v-row class="ma-0 align-center d-flex">
            <TextField
              :get="`lesson.${$props.datas}.title`"
              :rules="[(v) => !!v || 'Le titre est obligatoire']"
              title
            />
          </v-row>
          <v-row class="ma-0">
            <p class="ma-0 align-center d-flex">
              {{ lesson.studentIdsList ? lesson.studentIdsList.length : 0 }}/
            </p>
            <TextField
              suffix=" élèves"
              :get="`lesson.${$props.datas}.maximumStudents`"
              :rules="[
                (v) => !!v || 'Le nombre maximum d\'étudiant est obligatoire',
                (v) =>
                  !isNaN(Number(v)) ||
                  'Le nombre maximum d\'étudiant doit etre un nombre',
              ]"
            />
          </v-row>
        </v-col>
        <div class="d-flex flex-column align-center">
          <v-row>
            <v-btn
              color="error"
              @click="
                $store.commit('overlay/open', {
                  component: 'DeleteForm',
                  props: {
                    dataToDelete: lesson,
                    type: 'lesson',
                  },
                })
              "
              >Archiver le cours</v-btn
            >
          </v-row>
          <v-row>
            <v-btn
              color="success"
              @click="
                $store.commit('overlay/open', {
                  component: 'LessonModificationForm',
                  props: { lesson: initialLesson, payload, modify: true },
                  title: 'Voulez-vous modifier :',
                })
              "
              >Enregistrer le cours</v-btn
            >
          </v-row>
        </div>
      </v-row>
      <v-col>
        <v-row class="justify-center">
          <v-card width="450" class="ma-6">
            <v-col>
              <div class="d-flex justify-start align-center">
                <p class="pa-4 text-no-wrap">Récurrence :</p>
                <div class="pa-4 recurrence-title">
                  {{ $store.state.lesson[$props.datas].recurrence }}
                </div>
              </div>
              <div class="d-flex justify-start align-center">
                <p class="pa-4 text-no-wrap">Tranche d'age:</p>
                <div class="pa-4">
                  <SelectField
                    :get="`lesson.${$props.datas}.ageRange`"
                    :items="[
                      { text: 'enfant', value: 'child' },
                      { text: 'adolescent', value: 'teenager' },
                      { text: 'adulte', value: 'adult' },
                      { text: 'mixte', value: 'mixed' },
                    ]"
                  />
                </div>
              </div>
              <div class="d-flex justify-start align-center">
                <p class="pa-4 text-no-wrap">Prix:</p>
                <div class="pb-4 pl-4 pr-4">
                  <TextField
                    suffix=" €"
                    :get="`lesson.${$props.datas}.price`"
                    :rules="[
                      (v) => !!v || 'Le prix est obligatoire',
                      (v) => !isNaN(Number(v)) || 'Le prix doit etre un nombre',
                    ]"
                  />
                </div>
              </div>
            </v-col>
          </v-card>
          <v-card width="450" class="ma-6 pa-6">
            <EveryWeekDatePicker
              v-if="lesson.recurrence === 'everyWeek'"
              :getStart="`lesson.${$props.datas}.startDate`"
              :getEnd="`lesson.${$props.datas}.endDate`"
              label="Sélectionnez le jour du cours"
            />
            <UniqueDatePicker
              v-if="lesson.recurrence === 'unique'"
              :getStart="`lesson.${$props.datas}.startDate`"
              :getEnd="`lesson.${$props.datas}.endDate`"
              label="Sélectionnez le date du cours"
            />
          </v-card>
        </v-row>
        <v-row class="justify-center">
          <v-card width="450" class="ma-6 pa-4">
            <div class="pa-3">
              <p class="mb-0">Description du cours:</p>
              <TextArea :get="`lesson.${$props.datas}.description`" />
            </div>
          </v-card>
          <v-card width="450" class="ma-6 pa-4">
            <div class="pa-3">
              <p class="mb-0">Note pour le professeur:</p>
              <TextArea :get="`lesson.${$props.datas}.teacherNote`" />
            </div>
          </v-card>
        </v-row>
      </v-col>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: String,
      required: true,
    },
  },
  computed: {
    lesson() {
      return this.$store.state.lesson[this.$props.datas]
    },
    valid: {
      get() {
        return this.$store.state.lesson[this.$props.datas].valid
      },
      set(newValue) {
        this.$store.commit('lesson/modify', {
          stateName: this.$props.datas,
          payload: { valid: newValue },
        })
      },
    },
  },
}
</script>

<style>
.recurrence-title {
  margin-bottom: 14px;
  color: rgb(87, 87, 87);
}
</style>