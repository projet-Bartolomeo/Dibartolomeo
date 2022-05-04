<template>
<div>
     <v-card
            width="450"
            class="ma-6 pa-9 d-flex flex-column justify-start align-start"
          >
            <div>Jour du cours:</div>
            <UniqueDatePicker
              v-if="`lesson.${$props.stateName}.recurrence` === 'unique'"
              :getstart="`lesson.${$props.stateName}.startDate`"
              :get="`lesson.${$props.stateName}.endDate`"
            />
            <EveryWeekDatePicker
              v-else
              :getstart="`lesson.${$props.stateName}.startDate`"
              :getend="`lesson.${$props.datas}.endDate`"
            />
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