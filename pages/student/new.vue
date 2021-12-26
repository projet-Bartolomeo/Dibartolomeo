<template>
  <div>
    <Title value="Création d'un élève" />
    <v-col class="justify-center">
      <v-form ref="form" v-model="valid" lazy-validation>
        <StudentForm class="mt-10" />
        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-btn
            id="enregistrer"
            class="mt-10"
            elevation="7"
            :disabled="!valid"
            color="success"
            width="150px"
            @click="validate()"
            >Ajouter</v-btn
          >
        </v-row>
      </v-form>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
    }
  },
  created() {
    this.test()
  },
  methods: {
    async setUser() {
      await this.$store.dispatch(
        'student/createFromTeacher',
        this.$store.state.student.new
      )
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (this.setUser()) {
          window.location.href = "/student/list"
        }
      }
    },
  },
}
</script>
