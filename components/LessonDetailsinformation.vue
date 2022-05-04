<template>
  <div id="divbug">
         <v-card width="450" class="ma-6">
            <v-col>
              <div
                v-if="$props.datas === 'new'"
                class="d-flex justify-start align-center"
              >
                <p class="pa-4 text-no-wrap">Récurrence :</p>
                <div class="pt-3 pl-2 recurrence-title">
                  <SelectField
                    :get="`lesson.${$props.stateName}.recurrence`"
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
      this.$router.push('/professor/lesson/list')
    },
  },
}
</script>
<style>
#cont1 {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

#divbug {
  margin: 5vh;
  display: flex;
  justify-content: space-between;
}

.lesson-form {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
}
</style>