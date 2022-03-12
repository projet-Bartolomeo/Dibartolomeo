<template>
  <div class="d-flex justify-center align-center flex-column">
    <v-card-title class="text-h5 overflow-wrap-normal">
      {{ datas.text }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="white--text ma-4"
        text
        color="blue-grey darken-1"
        @click="$store.commit('overlay/close')"
        >Annuler</v-btn
      >
      <v-btn
        text
        class="white--text ma-4"
        color="blue-grey darken-1"
        @click="remove"
        >Confirmer</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Object,
      required: true,
    },
    dataToDelete: {
      type: Object,
      required: true,
    },
  },
  computed: {
    datas() {
      return this.$props.type === 'lesson'
        ? {
            text: 'Etes-vous sur de vouloir archiver votre cours',
            dispatch: {
              key: 'lesson/archive',
              value: {
                lesson: this.$props.dataToDelete,
                all: this.$props.dataToDelete.recurrenceId !== undefined,
              },
            },
          }
        : {
            text: 'Etes-vous sur de vouloir supprimer cet élève',
            dispatch: {
              key: 'student/removeFromTeacher',
              value: { student: this.$props.dataToDelete },
            },
          }
    },
  },
  methods: {
    remove() {
      this.$store.dispatch(this.datas.dispatch.key, this.datas.dispatch.value)
      this.$store.commit('overlay/close')
      if (this.$props.type === 'lesson') {
        this.$router.push('/professor/lesson/list')
      } else {
        this.$router.push('/professor/student/list')
      }
    },
  },
}
</script>
