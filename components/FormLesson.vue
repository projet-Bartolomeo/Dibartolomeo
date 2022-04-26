<template>
  <div style="width: 66.5vw">
    <v-form v-model="valid">
      <div style="display: flex; width: 100%">
        <div>
          <h1 style="margin-bottom: 3vh; margin-left: 1vw">Ajouter un cours</h1>
          <v-card elevation="6" width="45vw" height="8.8vh" min-height="55px">
            <div id="cont1">
              <TextField
                :get="`lesson.${$props.datas}.title`"
                :rules="[(v) => !!v || 'Le titre est obligatoire']"
                
                :open="open"
                placeholder="Entrez le titre"
              />
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
            </div>
          </v-card>
        </div>
        <div style="display: flex; flex-direction: column; width: 21vw">
          <v-btn
            v-if="$props.datas === 'new'"
            :disabled="!hasModifications"
            depressed
            color="#EBEBEB"
            width="55%"
            height="25%"
            style="align-self: flex-end; margin-bottom: 1.5vh"
            >RETABLIR<v-icon class="ml-2"> mdi-arrow-u-down-left </v-icon></v-btn
          >
          <v-btn
            v-if="$props.datas === 'new'"
            depressed
            class="white--text"
            color="#41C6A7"
            width="55%"
            height="25%"
            :disabled="!valid"
            style="align-self: flex-end; margin-bottom: 1.5vh"
            @click="$store.dispatch('lesson/resetNewForm')"
            >ENREGISTRER   <v-icon class="ml-2"> mdi-content-save </v-icon>
          </v-btn>
        </div>
      </div>
      <div>
        <div id="divbug">
          <div style="display: flex; flex-direction: column">
            <v-card
              elevation="6"
              width="30vw"
              height="37vh"
              style="margin-bottom: 5vh"
            >
              <div class="ml-6 mr-6 mt-6" style="color: grey">
                Réccurence
                <v-divider> </v-divider>
              </div>
              <div class="ml-6 mr-6 recurrence-title">
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
              <div class="ml-6 mr-6 mt-6" style="color: grey">
                Tranche d'âge
                <v-divider> </v-divider>
              </div>
              <div class="ml-6 mr-6">
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
              <div class="ml-6 mr-6 mt-6" style="color: grey">
                Prix
                <v-divider> </v-divider>
              </div>
              <div class="ml-6 d-flex justify-start align-center">
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
            </v-card>
            <v-card width="30vw" class="pa-4">
              <div>
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
          </div>
          <div style="display: flex; flex-direction: column">
            <v-card
              elevation="6"
              width="30vw"
              height="37vh"
              style="margin-bottom: 5vh"
            >
              <div class="ma-6">
                <div class="ml-6 mr-6 mt-6" style="color: grey">
                  Jour et horaires de cours
                  <v-divider> </v-divider>
                </div>
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
              </div>
            </v-card>
            <v-card width="30vw" class="pa-4">
              <div>
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
          </div>
        </div>
      </div>
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
<style scoped>
#cont1 {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
#divbug {
  width: 65vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
}
</style>
