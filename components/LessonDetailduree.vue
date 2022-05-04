<template>
    <div>
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
                    :get="`lesson.${$props.stateName}.ageRange`"
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
                    :get="`lesson.${$props.stateName}.price`"
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
export default {
    props: {
        stateName: {
            type: String,
            required: true
        },
    },
    computed: {
        open() {
            return this.$props.stateName === 'new'
        },
        studentIds() {
            const lesson = this.$store.state.lesson[this.$props.stateName]
            return lesson ? lesson.studentIds : 0
        }
    }
}
</script>