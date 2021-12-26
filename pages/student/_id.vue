<template>
  <div>
    <title value="Création d'un élève" />
    <v-col class="justify-center">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row class="align-center my-10">
          <StudentForm class="ma-5"  />
          <ButtonStudent class="d-flex flex-column justify-space-around"/>
        </v-row>
        <DataTableLesson :datas="$store.state.lesson.getByStudentId" />
        <v-row class="d-flex justify-center mb-6 align-center mt-5">
          <v-btn
            id="enregistrer"
            class="mt-10"
            elevation="7"
            :disabled="!valid"
            color="success"
            width="150px"
            @click="validate()"
            >Enregistrer</v-btn
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
          window.location.href = '/student/list'
        }
      }
    },
  },
}
</script>
