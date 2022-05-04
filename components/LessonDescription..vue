<template>
     <v-card width="450" class="ma-6 pa-4">
            <div class="pa-3">
              <p v-if="$props.datas === 'new'" class="mb-0">
                Note pour le professeur (optionnel):
              </p>
              <p v-else class="mb-0">Note pour le professeur:</p>
              <TextArea
                :get="`lesson.${$props.stateName}.teacherNote`"
                :open="open"
                placeholder="Entrez la note du cours"
              />
            </div>
          </v-card>
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
