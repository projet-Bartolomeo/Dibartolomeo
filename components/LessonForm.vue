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
              :open="open"
              placeholder="Entrez le titre"
            />
          </v-row>
          <v-row class="ma-0">
            <p class="ma-0 align-center d-flex">
              {{ lesson.studentIds ? lesson.studentIds.length : 0 }}/
            </p>
            <TextField
              :suffix="$props.datas === 'new' ? '' : 'élèves'"
              :get="`lesson.${$props.datas}.maximumStudents`"
              :rules="[
                (v) => !!v || 'Le nombre maximum d\'élèves est obligatoire',
                (v) =>
                  !isNaN(Number(v)) ||
                  'Le nombre maximum d\'élèves doit etre un nombre',
              ]"
              number
              :open="open"
              placeholder="Entrez le nb max d'élèves"
            />
          </v-row>
        </v-col>
        <div class="d-flex">
          <v-btn
            v-if="$props.datas !== 'new'"
            color="grey darken-2"
            fab
            text
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
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
          <v-btn
            v-if="$props.datas !== 'new'"
            color="grey darken-2"
            fab
            text
            @click="
              $store.commit('overlay/open', {
                component: 'MessageForm',
                props: { recipients: [lesson], type: 'lesson' },
                title: 'Tapez votre message',
              })
            "
          >
            <v-icon> mdi-message </v-icon>
          </v-btn>
          <v-btn
            v-if="valid && $props.datas === 'new'"
            color="grey darken-2"
            fab
            text
            @click="create"
          >
            <v-icon> mdi-content-save </v-icon>
          </v-btn>
          <v-btn
            v-if="$props.datas === 'new' && hasModifications"
            color="grey darken-2"
            fab
            text
            @click="$store.dispatch('lesson/resetNewForm')"
          >
            <v-icon> mdi-arrow-u-down-left </v-icon>
          </v-btn>
          <div v-if="$props.datas !== 'new' && hasModifications && valid">
            <v-btn
              color="grey darken-2"
              fab
              text
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
            >
              <v-icon> mdi-content-save </v-icon>
            </v-btn>
            <v-btn
              color="grey darken-2"
              fab
              text
              @click="
                $store.dispatch('resetEditionForm', {
                  storeName: 'lesson',
                  stateName: $props.datas,
                })
              "
            >
              <v-icon> mdi-arrow-u-down-left </v-icon>
            </v-btn>
          </div>
        </div>
      </v-row>
      <v-col>
        <v-row class="justify-center">
          <v-card width="450" class="ma-6">
            <v-col>
              <div
                v-if="$props.datas === 'new'"
                class="d-flex justify-start align-center"
              >
                <p class="pa-4 text-no-wrap">Récurrence :</p>
                <div class="pt-3 pl-2 recurrence-title">
                  <SelectField
                    :get="`lesson.${$props.datas}.recurrence`"
                    :items="[
                      { text: 'Chaque semaine', value: 'everyWeek' },
                      { text: 'Unique', value: 'unique' },
                    ]"
                    :open="open"
                    :defaultValue="$props.datas === 'new' ? 'everyWeek' : ''"
                  />
                </div>
              </div>
              <div v-else class="d-flex justify-start align-center">
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
                      { text: 'Enfant', value: 'child' },
                      { text: 'Adolescent', value: 'teenager' },
                      { text: 'Adulte', value: 'adult' },
                      { text: 'Mixte', value: 'mixed' },
                    ]"
                    :open="open"
                    :defaultValue="$props.datas === 'new' ? 'mixed' : ''"
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
                    :open="open"
                    placeholder="Entrez le prix du cours "
                  />
                </div>
              </div>
            </v-col>
          </v-card>
          <v-card
            width="450"
            class="ma-6 pa-9 d-flex flex-column justify-start align-start"
          >
            <div>Jour du cours:</div>
            <UniqueDatePicker
              v-if="lesson.recurrence === 'unique'"
              :getStart="`lesson.${$props.datas}.startDate`"
              :getEnd="`lesson.${$props.datas}.endDate`"
            />
            <EveryWeekDatePicker
              v-else
              :getStart="`lesson.${$props.datas}.startDate`"
              :getEnd="`lesson.${$props.datas}.endDate`"
            />
          </v-card>
        </v-row>
        <v-row class="justify-center">
          <v-card width="450" class="ma-6 pa-4">
            <div class="pa-3">
              <p v-if="$props.datas === 'new'" class="mb-0">
                Description du cours (optionnel):
              </p>
              <p v-else class="mb-0">Description du cours:</p>
              <TextArea
                :get="`lesson.${$props.datas}.description`"
                :open="open"
                placeholder="Entrez la description"
              />
            </div>
          </v-card>
          <v-card width="450" class="ma-6 pa-4">
            <div class="pa-3">
              <p v-if="$props.datas === 'new'" class="mb-0">
                Note pour le professeur (optionnel):
              </p>
              <p v-else class="mb-0">Note pour le professeur:</p>
              <TextArea
                :get="`lesson.${$props.datas}.teacherNote`"
                :open="open"
                placeholder="Entrez la note du cours"
              />
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
    open() {
      return this.$props.datas === 'new'
    },
  },
  methods: {
    create() {
      this.$store.dispatch('lesson/create', this.$store.state.lesson.new)
      this.$router.push('/lesson/list')
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