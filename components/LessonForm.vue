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
              number
            />
          </v-row>
        </v-col>
        <div class="d-flex flex-column align-center">
          <v-row>
            <v-btn
              class="pa-4"
              color="error"
              @click="
                $store.commit('overlay/open', {
                  component: 'LessonModificationForm',
                  props: {
                    lesson,
                    archive: true,
                    redirectPath: '/lesson/list',
                  },
                  title: lesson.recurrenceId ? 'Voulez-vous archiver :' : '',
                })
              "
              >Archiver</v-btn
            >
          </v-row>
          <div class="d-flex flex-column pa-4" v-if="hasModifications && valid">
            <v-btn
              color="success"
              @click="
                $store.commit('overlay/open', {
                  component: 'LessonModificationForm',
                  props: {
                    lesson,
                    payload: $store.state.lesson.form.payload,
                    modify: true,
                  },
                  title: lesson.recurrenceId ? 'Voulez-vous enregistrer :' : '',
                })
              "
              >Enregistrer</v-btn
            >
            <v-btn
              class="white--text"
              color="blue darken-1"
              @click="
                $store.commit('set', {
                  stateName: 'form',
                  lesson: { valid: true },
                })
              "
              >Réinitialiser</v-btn
            >
          </div>
        </div>
      </v-row>
      <v-col>
        <v-row class="justify-center">
          <v-card width="450" class="ma-6">
            <v-col>
              <div class="d-flex justify-start align-center">
                <p class="pa-4 text-no-wrap">Récurrence :</p>
                <div class="pa-4 recurrence-title">
                  {{ recurrence }}
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
                    number
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
import { Recurrence } from '../enums/Recurrence'
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
        return this.$store.state.lesson.form.valid
      },
      set(newValue) {
        this.$store.commit('lesson/modify', {
          stateName: 'form',
          payload: { valid: newValue },
        })
      },
    },
    recurrence() {
      if (this.$store.state.lesson[this.$props.datas] === undefined) return ''
      const recurrence = this.$store.state.lesson[this.$props.datas].recurrence
      return Recurrence[recurrence]
    },
    hasModifications() {
      if (this.$store.state.lesson.form.payload === undefined) return false
      return Object.keys(this.$store.state.lesson.form.payload).length > 0
    },
  },
  created() {
    this.$store.commit('set', { stateName: 'form', lesson: { valid: true } })
  },
}
</script>

<style>
.recurrence-title {
  margin-bottom: 14px;
  color: rgb(87, 87, 87);
}
</style>