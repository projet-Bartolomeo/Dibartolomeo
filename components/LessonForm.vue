<template>
  <div>
    <v-form v-model="valid">
      <v-row class="justify-space-around">
        <v-col
          align-self="center"
          cols="12"
          class="col-sm-10 col-md-7 col-lg-9 col-xl-6"
        >
          <v-card class="pa-10 ma-6">
            <v-row>
              <v-row class="ma-0 align-center d-flex">
                <p class="ma-0 pr-2">Nom :</p>
                <TextField
                  :get="`lesson.${$props.datas}.title`"
                  :rules="[(v) => !!v || 'Le titre est obligatoire']"
                  :open="open"
                  placeholder="Entrez le nom du cours"
                />
              </v-row>
              <v-row class="ma-0 align-center d-flex">
                <p class="ma-0 pr-2">Nbr max d'élèves :</p>
                <TextField
                  :get="`lesson.${$props.datas}.maximumStudents`"
                  :rules="[
                    (v) => !!v || 'Le nombre maximum d\'élèves est obligatoire',
                    (v) =>
                      !isNaN(Number(v)) ||
                      'Le nombre maximum d\'élèves doit etre un nombre',
                  ]"
                  number
                  :open="open"
                  placeholder="Entrez le nbr max d'élèves"
                />
              </v-row>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          align-self="center"
          cols="12"
          class="col-sm-6 col-md-3 col-lg-3 col-xl-2"
        >
          <div class="d-flex flex-column">
            <v-btn
              v-if="$props.datas !== 'new'"
              color="#fa3257"
              class="ma-2"
              style="color: white"
              @click="
                $store.commit('overlay/open', {
                  component: 'LessonModificationForm',
                  props: {
                    lesson,
                    archive: true,
                    redirectPath: '/professor/lesson/list',
                  },
                  title: lesson.recurrenceId ? 'Voulez-vous archiver :' : '',
                })
              "
              >Suprrimer
              <v-icon class="ml-2"> mdi-delete </v-icon>
            </v-btn>
            <v-btn
              v-if="$props.datas !== 'new'"
              color="#53b3e6"
              class="ma-2"
              style="color: white"
              @click="
                $store.commit('overlay/open', {
                  component: 'MessageForm',
                  props: { recipients: [lesson], type: 'lesson' },
                  title: 'Tapez votre message',
                })
              "
              >Message
              <v-icon class="ml-2"> mdi-message </v-icon>
            </v-btn>
            <v-btn
              v-if="valid && $props.datas === 'new'"
              color="#76d9a3"
              class="ma-2"
              style="color: white"
              @click="create"
              >Enregistrer
              <v-icon class="ml-2"> mdi-content-save </v-icon>
            </v-btn>

            <v-btn
              v-if="$props.datas === 'new' && hasModifications"
              color="#f4f4f4"
              class="ma-2"
              @click="$store.dispatch('lesson/resetNewForm')"
            >
              Rétablir
              <v-icon class="ml-2"> mdi-arrow-u-down-left </v-icon>
            </v-btn>
            <div
              class="d-flex flex-column"
              v-if="$props.datas !== 'new' && hasModifications && valid"
            >
              <v-btn
                color="#76d9a3"
                class="ma-2"
                style="color: white"
                @click="
                  $store.commit('overlay/open', {
                    component: 'LessonModificationForm',
                    props: {
                      lesson,
                      payload: $store.state.lesson.form.payload,
                      modify: true,
                    },
                    title: lesson.recurrenceId
                      ? 'Voulez-vous enregistrer :'
                      : '',
                  })
                "
                >Enregistrer
                <v-icon class="ml-2"> mdi-content-save </v-icon>
              </v-btn>
              <v-btn
                color="#f4f4f4"
                class="ma-2"
                @click="
                  $store.dispatch('resetEditionForm', {
                    storeName: 'lesson',
                    stateName: $props.datas,
                  })
                "
                >Rétablir
                <v-icon class="ml-2"> mdi-arrow-u-down-left </v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-space-around">
        <v-col cols="12" class="col-sm-10 col-md-5 col-lg-6 col-xl-4">
          <v-card height="85%" class="ma-6">
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
                    :defaultvalue="$props.datas === 'new' ? 'everyWeek' : ''"
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
                    :defaultvalue="$props.datas === 'new' ? 'mixed' : ''"
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
        </v-col>
        <v-col cols="12" class="col-sm-10 col-md-5 col-lg-6 col-xl-4">
          <v-card
            height="85%"
            class="ma-6 pa-9 d-flex flex-column justify-start align-start"
          >
            <div>Jour du cours:</div>
            <UniqueDatePicker
              v-if="lesson.recurrence === 'unique'"
              :getstart="`lesson.${$props.datas}.startDate`"
              :getend="`lesson.${$props.datas}.endDate`"
            />
            <EveryWeekDatePicker
              v-else
              :getstart="`lesson.${$props.datas}.startDate`"
              :getend="`lesson.${$props.datas}.endDate`"
            />
            <LessonPictureInput picture-datas="picture.lessonPictureSelected" />
          </v-card>
        </v-col>
      </v-row>

      <v-row class="justify-space-around">
        <v-col cols="12" class="col-sm-10 col-md-5 col-lg-6 col-xl-4">
          <v-card class="pa-4 ma-6">
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
        </v-col>
        <v-col cols="12" class="col-sm-10 col-md-5 col-lg-6 col-xl-4">
          <v-card class="pa-4 ma-6">
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
        </v-col>
      </v-row>
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
      const lessonDatas = {
        ...this.$store.state.lesson.new,
        ...this.$store.state.lesson.form.payload,
      }
      this.$store.dispatch('lesson/create', { lessonDatas })
      this.$router.push('/professor/lesson/list')
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