<template>
  <div>
    <title value="Création d'un élève" />
    <v-col class="justify-center">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row class="align-center my-10">
          <StudentForm datas="details" class="ma-5" />
          <ButtonStudent class="d-flex flex-column justify-space-around" />
        </v-row>
        <DataTableLesson datas="studentList" />
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
  async created() {
    await this.$store.dispatch('student/setDetails', this.$route.query.id)
    await this.$store.dispatch('lesson/setStudentList', this.$route.query.id)
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('student/modify', {
          studentId: this.$route.query.id,
          payload: this.$store.state.student.details,
        })
        this.$router.push('/student/list')
      }
    },
  },
}
</script>
