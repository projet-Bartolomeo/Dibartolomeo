<template>
  <div>
    <h3>Ajouter participant additionel</h3>
    <v-form v-model="validParticipant">
      <v-col md="6">
        <v-row class="align-center justify-start">
          <p class="ma-0 mr-2">Prénom :</p>
          <TextField
            :open="open"
            :get="`student.${$props.datas}.firstName`"
            :rules="[(v) => !!v || 'Le prénom est obligatoire']"
          />
        </v-row>
      </v-col>
      <v-col md="6">
        <v-row class="align-center justify-start">
          <p class="ma-0 mr-2">Nom :</p>
          <TextField
            :open="open"
            :get="`student.${$props.datas}.lastName`"
            :rules="[(v) => !!v || 'Le prénom est obligatoire']"
          />
        </v-row>
      </v-col>
      <v-btn
        v-if="validParticipant"
        fab
        text
        color="grey darken-2"
        class="ma-2"
        @click="create()"
      >
        <v-icon> mdi-content-save </v-icon>
      </v-btn>
            <v-btn
        v-if="hasModifications"
        color="grey darken-2"
        fab
        text
        class="ma-2"
        @click="
          $store.dispatch('studentResetEditionForm', {
            storeName: 'student',
            stateName: $props.datas,
          })
        "
      >
        <v-icon> mdi-arrow-u-down-left </v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: String,
      required: true,
    },
  },
  computed: {
    student() {
      return this.$store.state.student[this.$props.datas]
    },
    validParticipant: {
      get() {
        return this.$store.state.student.form.validParticipant
      },
      set(newValue) {
        this.$store.commit('student/modify', {
          stateName: 'form',
          payload: { validParticipant: newValue },
        })
      },
    },
    hasModifications() {
      if (this.$store.state.student.form.payload === undefined) return false
      return Object.keys(this.$store.state.student.form.payload).length > 0
    },
    open() {
      return this.$props.datas === 'new'
    },
  },
  methods: {
    create() {
      this.$store.state.student.new.email =
        this.$store.state.student.details.email
      this.$store.state.student.new.isPrincipal = false
      this.$store.dispatch(
        'student/createFromTeacher',
        this.$store.state.student.new
      )
      this.$router.push('/professor/student/list')
    },
  },
}
</script>