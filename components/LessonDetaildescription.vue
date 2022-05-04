<template>
    <div>
 <v-card width="450" class="ma-6 pa-4">
   
            <div class="pa-3">
              <p v-if="$props.datas === 'new'" class="mb-0">
                Description du cours (optionnel):
              </p>
              <p v-else class="mb-0">Description du cours:</p>
              <TextArea
                :get="`lesson.${$props.stateName}.description`"
                :open="open"
                placeholder="Entrez la description"
              />
            </div>
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