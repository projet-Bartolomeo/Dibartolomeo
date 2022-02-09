<template>
  <div>
    <h3>Ajouter participant additionel</h3>
    <v-form ref="form" v-model="valid">
      <v-col md="6">
        <v-row class="align-center justify-start">
          <p class="ma-0 mr-2">Prénom :</p>
          <v-text-field
            v-model="$store.state.student.participant[$props.index].firstName"
            required
          ></v-text-field>
          <TextField
            :open="open"
            :get="`student.${$props.datas}[${$props.index}].firstName`"
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
            :rules="[(v) => !!v || 'Le nom est obligatoire']"
          />
        </v-row>
      </v-col>
      <v-btn
        v-if="valid"
        fab
        text
        color="grey darken-2"
        class="ma-2"
        @click="create()"
      >
        <v-icon> mdi-content-save </v-icon>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
  }),
  props: {
    datas: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    student() {
      return this.$store.state.student[this.$props.datas]
    },
    open() {
      return this.$props.datas === 'new'
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    create() {
      this.$store.state.student.new.email =
        this.$store.state.student.details.email
      this.$store.state.student.new.isPrincipal = false
      this.$store.state.student.new.idUserPrincipal =
        this.$store.state.user.idStudent
      this.$store.dispatch(
        'student/createFromTeacher',
        this.$store.state.student.new
      )
      this.fetchData()
      this.$store.dispatch('student/setNew', this.$store.state.user.idStudent)
    },

    async fetchData() {
      this.participant = await this.$store.dispatch(
        'student/setParticipant',
        this.$store.state.user.idStudent
      )
    },
  },
}
</script>