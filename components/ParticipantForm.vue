<template>
  <div>
    <h3>Ajouter participant additionel</h3>
    <v-col md="6">
      <v-row class="align-center justify-start">
        <p class="ma-0 mr-2">Prénom :</p>
        <TextField
          :open="true"
          :get="`student.${$props.datas}.firstName`"
          :rules="[(v) => !!v || 'Le prénom est obligatoire']"
        />
      </v-row>
    </v-col>
    <v-col md="6">
      <v-row class="align-center justify-start">
        <p class="ma-0 mr-2">Nom :</p>
        <TextField
          :open="true"
          :get="`student.${$props.datas}.lastName`"
          :rules="[(v) => !!v || 'Le prénom est obligatoire']"
        />
      </v-row>
    </v-col>
 <v-btn
        fab
        text
        color="grey darken-2"
        class="ma-2"
        @click="create()"
      >
        <v-icon> mdi-content-save </v-icon>
      </v-btn>
    

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

  created() {
    this.$store.state.student.new.email = this.$store.state.user.emailStudent
    this.$store.state.student.new.isPrincipal = false

  },
  methods: {
    create() {
      this.$store.dispatch(
        'student/createFromTeacher',
        this.$store.state.student.new
      )
      this.$router.push('/professor/student/list')
    },
  },
}
</script>